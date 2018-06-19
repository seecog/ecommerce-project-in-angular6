import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
@Injectable()
export class CategoryService{

    constructor(private http : Http){

    }

getCategories(){
    return this.http.get('https://bshop-4d7cd.firebaseio.com/categories.json');
}


}