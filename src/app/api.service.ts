import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "src/app/interfaces/products.interface";
import config from "../../auth_config.json";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${config.apiUri}/api/Product`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${config.apiUri}/api/Product`, product);
  }

  updateProduct(productId: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${config.apiUri}/api/Product/${productId}`, product);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${config.apiUri}/api/Product/${productId}`);
  }
}
