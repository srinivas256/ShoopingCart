import { Component } from '@angular/core';
import { User} from './model';
import { DataServiceService} from './data-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  users:User[];
  newUsers: User[];
  totalCount= 0;
  showCheckOut = false;
  orderPlaced = false;
 
  constructor( private _dataService:DataServiceService ){
    
  }

  getData(){
   this.showCheckOut = false;
   this.totalCount = 0;
    this._dataService.getDataFromServer()
    .subscribe( data => this.users = data,
      error => console.log(error)
      )  
      this.newUsers = this.users.map(function(v){
        Object(v).count = 0;
        return v;
     })
  }

  getIncrement(i){
    let counter = this.newUsers[i]['count'];
    counter = counter+1;
    this.newUsers[i]['count'] = counter;
    this.updateCount();
  
  }
  getDecrement(i){
    let counter = this.newUsers[i]['count'];
    counter = counter-1;
    this.newUsers[i]['count'] = counter;
    this.updateCount();
  }

  updateCount(){
     //console.log(this.totalCount);
     let counter= 0;
    this.newUsers.map(function(v){
      counter = counter + v['count'];
     // console.log(this.totalCount);
     })
     this.totalCount = counter;
  }



  addToCart(){
    this.showCheckOut = true;
    this.newUsers = this.newUsers.filter(this.checkItem)
   //conso
  }
  checkItem(item){
  
    return item['count'] > 0;
  }
  checkOut(){
   this.orderPlaced = true;
  }
}
