import { Component } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  isSignDivVisiable: boolean = true;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  studentForm:FormGroup=new FormGroup({
    name: new FormControl(),
    email: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
  })
  constructor(private router: Router) {
  }




  onRegister() {
   
   
      const localUser = localStorage.getItem('angular17users');
      if (localUser != null) {
        const users = JSON.parse(localUser);
        users.push(this.signUpObj);
        localStorage.setItem('angular17users', JSON.stringify(users))
      } else {
        const users = [];
        users.push(this.signUpObj);
        localStorage.setItem('angular17users', JSON.stringify(users))
      }
      alert('Registration Success')
    }
  

  onLogin() {
    const localUsers = localStorage.getItem('angular17users');
    if (localUsers != null) {
      const users = JSON.parse(localUsers);

      const isUserPresent = users.find((user: SignUpModel) => user.email == this.loginObj.email && user.password == this.loginObj.password);
      if (isUserPresent != undefined) {
        alert("User Found...");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert("No User Found")
      }
    }
  }

}

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password = ""
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = ""
  }
}