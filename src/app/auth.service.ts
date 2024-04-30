import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs'
import { product } from './model/products';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  onProductCreate(products:{pName:string, desc : string, price: string}){
    const headers = new HttpHeaders({'myheader' : 'products'})
      this.http.post<{name : string}>('https://http-services-beb95-default-rtdb.firebaseio.com/products.json', products, {headers:headers}).subscribe((res)=>{
      console.log(res)
       })
  }

  onProductDelete(id : string){
    this.http.delete('https://http-services-beb95-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe()

  }

  getProducts(){
    return this.http.get<{[key : string] : product}>('https://http-services-beb95-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res)=>{
      const products = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id:key})
        }
        
      }
      return products
    }))
  }
  deleteProducts(){
    this.http.delete('https://http-services-beb95-default-rtdb.firebaseio.com/products.json').subscribe()
  }

  
  updateProd(id : string, value : product){
    this.http.put('https://http-services-beb95-default-rtdb.firebaseio.com/products/'+id+'.json', value).subscribe()
  }
}
