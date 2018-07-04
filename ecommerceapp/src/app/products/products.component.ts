import { Component, OnInit } from '@angular/core';
import { ProductService } from '../providers/product.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { CategoryService } from '../providers/category.service';
import { CartService } from '../providers/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: any[] = [];
  private tempProducts: any[] = [];
  private categories: any[] = [];
  items: Observable<any[]>;
  private cart : any;
  constructor(private http : Http,private db: AngularFireDatabase,private cartService : CartService, private routeParam: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(function (x) {
      console.log('The query param is ', x.get('category'));
    })
  }

  async ngOnInit() {
    // let cartRecord=await this.cartService.getCartRecord();
    // console.log('the cart record is ',cartRecord)

    let cartId = localStorage.getItem('cartId');
    console.log('The cart id is -->',cartId)
    this.items = this.db.list('/shopping-carts/').valueChanges();
    this.http.get('https://bshop-4d7cd.firebaseio.com/shopping-carts/'+cartId+'.json').subscribe(
      (res)=>{
        console.log('The response is --<>',res.json().items);
        this.cart=res.json().items;
      },
      (err)=>{
        console.log('The error is ',err)
      }
    )
 
    
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
             // console.log('The param is ', res.get('category'), product)

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

  getCartRef(product){
//     this.cartService.getCart(product.key).then(function(res){
// console.log('The net response is ',res)
//     })
//     .catch(function(err){
//     console.log('The error is ',err)
//     })
let cartRecord = this.cartService.getCartRecord();
    console.log('The cart record is ', cartRecord)
    return 1;
  }

  addToCart(product) {
    this.cartService.addTocart(product);
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



