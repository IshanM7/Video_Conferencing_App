import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(4)]),
    });
  }

  signup(): void{
    console.log(this.signupForm.value);
    this.authService
      .signup(this.signupForm.value)
      .subscribe((msg) => console.log(msg));
    this.router.navigate(["/dashboard"]);
  }
}
