import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable()
export class CartService {

    constructor(private http: Http, private db: AngularFireDatabase) {

    }

    create() {
        return this.db.list('/shopping-carts/').push({ dateCreated: new Date().getTime() });

    }
    async getOrCreateCartId() {
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            let cart = await this.create();
            localStorage.setItem('cartId', cart.key);
            return cart.key;
        }
        else {
            return cartId;
        }
    }

    async getCart(productId){
        let cartId = await this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
    }

    async addTocart(product) {
        let cartId = await this.getOrCreateCartId();
        let cartRef = await this.getCart(product.key); 
        cartRef.set({ product: product.data, quantity: 1 })
        console.log('The new cartId is ', cartId)
    }

}