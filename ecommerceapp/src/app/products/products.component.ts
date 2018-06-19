import { Component, OnInit } from '@angular/core';
import { ProductService } from '../providers/product.service';
import { CategoryService } from '../providers/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: any[] = [];
  private categories: any[];
  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {


    this.route.queryParamMap.subscribe(function (x) {
      console.log('The query param is ', x.get('category'));
    })

   }

  ngOnInit() {



    this.getCategories();
    this.productService.getAll().subscribe(
      (res) => {
        console.log('Record fetched ', res.json())
        let jsonRecord = res.json();
        let keys = Object.keys(jsonRecord);
        this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] };
        })
      },
      (error) => {
        console.log("Record updated")
      }
    )
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (res) => {
        console.log('The categories is ', res.json())
        let jsonArr = res.json();
        let keys = Object.keys(jsonArr);
        this.categories = keys.map(function (key) {
          return { key: key, data: jsonArr[key] };
        })
      },
      (error) => {
        console.log('The eror is ', error)
      }

    )
  }

}


