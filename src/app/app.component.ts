import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { product } from './model/products';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'httpservices';
  constructor(private service : AuthService){}

  data : product[] = []
  display : boolean = false
  currentprodId : string

  @ViewChild('Productsform') form : NgForm

  ngOnInit(){
    this.getProducts()
  }

  fetchProduct(){
    this.getProducts()
  }

  onProductCreate(products:{pName:string, desc : string, price: string}){
    if(!this.display)
      this.service.onProductCreate(products)
    else
      this.service.updateProd(this.currentprodId, products)
  }
  private getProducts(){
    this.service.getProducts().subscribe((products)=>{
      this.data = products
    })
  }

  editProd(id:string){
    this.currentprodId = id
    let currentProduct =  this.data.find((p)=>{return p.id === id})

     this.form.setValue({
      pName : currentProduct.pName,
      desc : currentProduct.desc,
      price : currentProduct.price
     })
     this.display = true
  }

  onDelete(id : string){
   this.service.onProductDelete(id)
  }
  deleteTotalProducts(){
    this.service.deleteProducts()
  }

}
