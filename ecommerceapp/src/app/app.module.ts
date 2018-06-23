import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NotificationComponent } from './notification/notification.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Route } from '@angular/router';
import { OrderSucessComponent } from './order-sucess/order-sucess.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {HttpModule} from '@angular/http';
//firebase start
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment.prod';
import { ProductFormComponent } from './admin/admin-products/product-form/product-form.component';
import { ProductService } from './providers/product.service';
import {DataTableModule} from "angular-6-datatable";
import { CategoryListComponent } from './products/category-list/category-list.component';
//firebase end
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    NotificationComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrderComponent,
    LoginComponent,
    OrderSucessComponent,
    NavBarComponent,
    ProductFormComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
      [
        
    { path: 'home', component: HomeComponent },
    { path: '', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'checkout', component: CheckOutComponent },
    { path: 'order-success', component: OrderSucessComponent },
    { path: 'my-orders', component: MyOrdersComponent },
    
    { path: 'admin/products/edit/:id', component: ProductFormComponent },
    { path: 'admin/products/new', component: ProductFormComponent },
    { path: 'admin/products', component: AdminProductsComponent },
    
    { path: 'admin/admin-orders', component: AdminOrderComponent },
    { path: 'login', component: LoginComponent }]),
    AngularFireModule.initializeApp(environment.firebase ,'bshop'),
    AngularFireAuthModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
