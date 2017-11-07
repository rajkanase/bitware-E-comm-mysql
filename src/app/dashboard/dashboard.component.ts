import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser:User;
  
    constructor(
      private userSer:UserServiceService,
      private router: Router
      // private modalService: NgbModal
    ) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  
     users:Array<User>;
     welcome;
     usr;
     closeResult: string;
     
  
    // users: User[]=[
    //   {
    //     "_id":"1",
    //     "role":"Admin Registration",
    //     "first_name":"rajkumar",
    //     "last_name":"kanase",
    //     "user_name":"raj.kanase",
    //     "email":"raj@gmail.com",
    //     "password":"123",
    //     "password_confirmation":"123"}
    // ];
  
    ngOnInit() {
      this.welcome=true;
      this.usr=false;
      
    }
  
  
    onWelcome(){
      this.welcome=true;
      this.usr=false;
      
    }
    onMngUsr(){
      console.log('here');
      
      this.userSer.getUsers()
      .subscribe(respUser=>{
        console.log(respUser);
        
        this.users=respUser;
        console.log(this.users);
        
      });
      this.usr=true;
      this.welcome=false;
    }
  
    onDelete(email){
      this.userSer.delUser(email).subscribe(respDel=>{
        console.log('Deleted');
        
      })
    }
  
    onEdit(email){
      this.userSer.editUsr(email).subscribe(respUser=>this.users=respUser);
    }
  
}
