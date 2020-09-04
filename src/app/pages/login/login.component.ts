import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });
    const formData = {
      userName: '',
      password: ''
    };
    this.loginForm.setValue(formData);
    setTimeout(() => {
      this.authService.logout();
    }, 500);
  }

   // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.executeAuthenticationService(this.loginForm.value.userName, this.loginForm.value.password, true)
      .then((res) => {
        this.router.navigate(['/locations']);
      }).catch((err) => {
        console.log(err);
        const message = err.error === 'INVALID_CREDENTIALS' ? 'Invalid credentials' : 'Something went wrong';
        this.notifierService.notify('error', message);
      });
  }

  createAccount() {
    this.router.navigate(['register']);
  }
}
