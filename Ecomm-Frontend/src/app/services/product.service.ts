import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8080/products";


  getAllProducts()
  {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getProductById(id:number)
  {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  addProduct(product:any)
  {
    return this.http.post(`${this.baseUrl}/add`,product);
  }

  deleteProduct(id:number)
  {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
