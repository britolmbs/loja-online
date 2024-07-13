import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:4200/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

    getProductById(id: string): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product);
    }

    updateProduct(id: string, product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, product);

    }

    deleteProduct(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/{id}`);
    }

}
