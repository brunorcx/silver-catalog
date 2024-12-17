import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.less",
})
export class ProductListComponent {
  products = [
    { name: "Product 1", description: "Great product", price: 99.99 },
    { name: "Product 2", description: "Amazing product", price: 79.99 },
    { name: "Product 3", description: "Fantastic product", price: 49.99 },
    { name: "Product 4", description: "Awesome product", price: 119.99 },
    { name: "Product 5", description: "Excellent product", price: 29.99 },
  ];
}
