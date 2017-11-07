import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private userSer:UserServiceService,
    private alertService: AlertService
  ) { }

  user:User;
  flag:any;
  x;
  y;

  ngOnInit() {
  }

  onLogin(em,pass){
   console.log(em);
   
    // console.log('sss');
    this.userSer.checkLogin(em,pass)
    .subscribe((respUser)=>{
      // console.log(respUser);
      
      this.router.navigate(['/dash']);
    },
    error=>{
        this.alertService.error(error);
      
    });


   

    

  }


}
