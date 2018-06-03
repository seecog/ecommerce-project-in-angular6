import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

// firebase start
// import {environment} from '../environments/environment.prod';
// import {AngularFireModule} from 'angularfire2';
// import {AngularFireStorageModule} from 'angularfire2/storage';
// import {AngularFireAuthModule} from 'angularfire2/auth';
// firebase end
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebase, 'bshop'),
    NgbModule.forRoot(),
    RouterModule.forRoot([
// {path : '', redirectTo : '/home', pathMatch : 'full'},
{path : 'home', component : HomeComponent},
{path : 'products', component : ProductsComponent},
{path : 'shopping-cart', component : ShoppingCartComponent},
{path : 'checkout', component : CheckOutComponent},
{path : 'order-success', component : OrderSuccessComponent},
{path : 'my-orders', component : MyOrdersComponent},
{path : 'admin/admin-products', component : AdminProductsComponent},
{path : 'admin/admin-orders', component : AdminOrdersComponent},
{path : 'login', component : LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
