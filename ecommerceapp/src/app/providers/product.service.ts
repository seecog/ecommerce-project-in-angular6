import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
@Injectable()
export class ProductService{


constructor(private http : Http){

}

create(product : any){
return this.http.post("https://bshop-4d7cd.firebaseio.com/products.json",product);
}

getAll(){
    return this.http.get("https://bshop-4d7cd.firebaseio.com/products.json");
    }

get(id){
    return this.http.get("https://bshop-4d7cd.firebaseio.com/products/"+id+".json");
   
}  
update(id,data){
    return this.http.put("https://bshop-4d7cd.firebaseio.com/products/"+id+".json",data);
  
}
remove(id){
    return this.http.delete("https://bshop-4d7cd.firebaseio.com/products/"+id+".json");
   
}
}