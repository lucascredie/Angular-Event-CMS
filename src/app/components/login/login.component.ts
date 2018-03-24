import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(["/"]);
      }
    })
  }

  onSubmit() {
    this.authService.logIn(this.email,this.password)
    .then(res => {
      console.log("LOGED IN!")
      this.router.navigate(["/"]);
    })
    .catch(err => {
      console.log("error login in");
      console.log(err.message);
      this.router.navigate(["/login"]);
      
    })
    

  }
}
