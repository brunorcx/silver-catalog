import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "src/app/api.service";
import { Product } from "src/app/interfaces/products.interface";
import { CapitalizePipe } from "../../shared/pipes/capitalize.pipe";
import { MatIconModule } from "@angular/material/icon";
import { FirebaseStorageService } from "src/app/core/services/firebase-storage.service";
import { ToastrService } from "ngx-toastr"; // Import ToastrService

@Component({
  selector: "app-product-management",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CapitalizePipe, MatIconModule],
  templateUrl: "./product-management.component.html",
  styleUrls: ["./product-management.component.less"],
})
export class ProductManagementComponent {
  productsList: Product[] = [];
  productForm: FormGroup;
  editingProduct = false;
  editingProductId: string | null = null;
  imagePreview: string | null = null;
  imageFile: File | null = null;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private storageService: FirebaseStorageService,
    private toastr: ToastrService // Inject ToastrService here
  ) {
    this.productForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      description: [""],
      price: [0, [Validators.required, Validators.min(0)]],
      availability: [true, Validators.required],
      category: [""],
      image: [null], // Make this optional during edit
    });

    this.fetchProducts();
  }

  fetchProducts() {
    this.api.getProducts().subscribe({
      next: (res) => (this.productsList = res as Product[]),
      error: (err) => console.error("Error fetching products:", err),
    });
  }

  onSubmitProductForm() {
    const product: Product = {
      ...this.productForm.value,
      category: this.productForm.value.category ? this.productForm.value.category.split(",").map((c: string) => c.trim()) : [],
    };

    if (this.productForm.valid) {
      if (this.imageFile) {
        this.storageService
          .uploadFile("images/" + this.imageFile.name, this.imageFile)
          .then((url) => {
            product.image = url;
            this.saveProduct(product);
          })
          .catch((err) => console.error("Error uploading image:", err));
      } else {
        this.saveProduct(product);
      }
    } else {
      console.error("Form is not valid");
    }
  }

  onEditProduct(product: Product) {
    this.editingProduct = true;
    this.editingProductId = product.id;

    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      availability: product.availability,
      category: product.category.join(", "),
    });

    this.imagePreview = product.image || null;
  }

  onDeleteProduct(product: Product) {
    if (confirm(`Tem certeza que gostaria de excluir o produto "${product.name}"?`)) {
      this.api.deleteProduct(product.id).subscribe({
        next: () => {
          this.fetchProducts();
          this.showToast("Produto excluído com sucesso!", true);
        },
        error: (err) => {
          console.error("Error deleting product:", err);
          this.showToast("Erro ao excluir o produto.");
        },
      });
    }
  }

  saveProduct(product: Product) {
    if (this.editingProduct) {
      this.api.updateProduct(this.editingProductId!, product).subscribe({
        next: () => {
          this.fetchProducts();
          this.resetForm();
          this.showToast("Produto atualizado com sucesso!", true);
        },
        error: (err) => {
          console.error("Error updating product:", err);
          this.showToast("Erro ao atualizar o produto.");
        },
      });
    } else {
      this.api.createProduct(product).subscribe({
        next: () => {
          this.fetchProducts();
          this.resetForm();
          this.showToast("Produto criado com sucesso!", true);
        },
        error: (err) => {
          console.error("Error creating product:", err);
          this.showToast("Erro ao criar o produto.");
        },
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.productForm.reset({
      name: "",
      description: "",
      price: 0,
      availability: true,
      category: "",
    });
    this.editingProduct = false;
    this.editingProductId = null;
    this.imagePreview = null;
    this.imageFile = null;
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.imageFile = input.files[0];
      this.productForm.patchValue({ image: this.imageFile });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  // Show toast message using ngx-toastr
  showToast(message: string, type?: boolean) {
    if (type) {
      this.toastr.success(message, "", { timeOut: 3000 });
    } else {
      this.toastr.error(message, "", { timeOut: 3000 });
    }
  }
}
