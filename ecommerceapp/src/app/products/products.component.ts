import { Component, OnInit } from '@angular/core';
import { ProductService } from '../providers/product.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { CategoryService } from '../providers/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: any[] = [];
  private tempProducts: any[] = [];
  private categories: any[] = [];

  constructor(private db: AngularFireDatabase, private routeParam: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
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
        this.tempProducts = this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] };
        })

        this.routeParam.queryParamMap.subscribe(
          (res) => {
            this.tempProducts = this.products.filter(product => {
              console.log('The param is ', res.get('category'), product)

              return res.get('category') === product.data.category;
            })
          },
          (err) => {
            console.log('The error is ', err)
          }

        );


        this.products = keys.map(function (key) {
          return { key: key, data: jsonRecord[key] };
        })
      },
      (error) => {
        console.log("Record updated")
      }
    )
  }

  addToCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      //create cart in firebase
      let cartInfo = this.db.list('/shopping-carts').push({ createDate: new Date().getTime() });
      console.log('The cart info is ', cartInfo)
      //add product to cart
    }
    else {
      //add product to cart
    }
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



