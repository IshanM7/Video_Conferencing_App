import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(4)]),
    });
  }

  login(): void{
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe();
    console.log(this.loginForm.value);

  }
}
