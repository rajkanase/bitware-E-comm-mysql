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
     zs:Array<User>;
     welcome;
     usr;
     cl="modal fade";
     xyz="none";
     closeResult: string;
     

  
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
      console.log(email);
      this.cl="modal fade in";
      this.xyz="block";
      this.userSer.editUsr(email).subscribe(respUser=>this.zs=respUser);
    }

    onClose(){
      this.cl="modal fade";
      this.xyz="none";
    }

    onUpdate(fname,lname,uname,email){
      let up_user:User=new User();
      up_user.first_name=fname;
      up_user.last_name=lname;
      up_user.user_name=uname;
      up_user.email=email;
      this.userSer.updateUsr(up_user).subscribe(resp=>{
        this.router.navigate(['/dash']);
      });
    }
  
}
