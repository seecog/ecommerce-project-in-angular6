import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm, FormGroup} from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AsyncHook } from 'async_hooks';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
@ViewChild('f') productForm : FormGroup;
private categories : any[];
private categoryCollection: AngularFirestoreCollection<any>;
items: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.categoryCollection = afs.collection<any>('categories');
    this.items = this.categoryCollection.valueChanges();
   }

  ngOnInit() {
  }

  

}
