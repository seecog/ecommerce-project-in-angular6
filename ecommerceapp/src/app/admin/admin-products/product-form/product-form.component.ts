import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import {Validators,FormControl} from '@angular/forms';
import {Http} from '@angular/http';
import { ProductService } from '../../../providers/product.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  private frm : FormGroup;
  private btn_stt : boolean = true;
  private edit_id : string;
  private categories: any[];
  private categoryCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>; 

  constructor(private routeParam : ActivatedRoute,private route : Router,private productService : ProductService,private afs: AngularFirestore,private http : Http) {

this.frm = new FormGroup({
  title : new FormControl('',[Validators.required]),
  cost : new FormControl('',[Validators.required]),
  category : new FormControl('',[Validators.required]),
  url : new FormControl('',[Validators.required])
})

    this.categoryCollection = afs.collection<any>('categories');
    console.log(this.categoryCollection);
    this.items = this.categoryCollection.valueChanges();
  }

  ngOnInit() {
    this.getCategories();
    this.routeParam.params.subscribe((param)=>{
      console.log('The key is ',param['id']);
      
      if(param['id']!=null)
      {
        this.edit_id = param['id'];
        this.btn_stt = false;
      }
      else{
        this.btn_stt = true;
      }
      this.productService.get(this.edit_id).subscribe(
        (res)=>{
          console.log('Edit dt isn ',res.json())
          this.frm.patchValue({title : res.json().title,
            cost : res.json().cost,
            category :  res.json().category,
            url :  res.json().url
          })
        },
        (error)=>{
          console.log("Record updated")
        }
      )
    })
  }

  saveProduct(){
this.productService.create(this.frm.value).subscribe(
  (res)=>{
    console.log('Record inserted')
    this.frm.patchValue({title : '',cost : '',category : 0,url : ''})
    this.route.navigate(['admin/products'])
  },
  (error)=>{
    console.log("Record updated")
  }
)
  }

updateProduct(){
    this.productService.update(this.edit_id,this.frm.value).subscribe(
      (res)=>{
        console.log('Record updated')
        this.btn_stt = true;
        this.route.navigate(['admin/products'])
      },
      (error)=>{
        console.log("Record updated")
      }
    )
      }

      deleteProduct(){
        if(confirm("Are you sure for this!")){
        this.productService.remove(this.edit_id).subscribe(
          (res)=>{
            console.log('Record deleted')
            this.route.navigate(['admin/products'])
          },
          (error)=>{
            console.log("Record updated")
          }
        )
      }
      }


      getCategories() {
        this.http.get('https://bshop-4d7cd.firebaseio.com/categories.json').subscribe(
          (res) => {
            console.log('Record fetched ', res.json())
            let jsonRecord = res.json();
            let keys = Object.keys(jsonRecord);
            this.categories = keys.map(function (key) {
              return { key: key, data: jsonRecord[key] };
            })
          },
          (error) => {
            console.log("Record updated")
          }
        )
      }

}








