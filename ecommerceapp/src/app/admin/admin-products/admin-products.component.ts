import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../providers/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
private products : any[]=[];
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe(
      (res)=>{
        console.log('Record fetched ',res.json())
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.products=keys.map(function(key){
          return {key : key,data : jsonRecord[key]};
        })
        },
      (error)=>{
        console.log("Record updated")
      }
    )
  }

}
