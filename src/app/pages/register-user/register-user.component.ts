import { Component, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { User } from '../../api/types';
import { UserService } from '../../api/user.service';
import { AuthService } from '../../services/auth.service';

 // tslint:disable:no-string-literal
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, DoCheck {
  public registerForm: FormGroup;
  public user: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private authService: AuthService,
              private route: ActivatedRoute,
              private location: Location,
              private notifierService: NotifierService) {}

  ngOnInit(): void {
    if (this.route.snapshot.data.edit) {
      this.user = JSON.parse(JSON.stringify(this.authService.loggedUser.value));
    }
    const user: User = JSON.parse(JSON.stringify(this.authService.loggedUser.value));
    if (!this.user) {
      this.registerForm = this.formBuilder.group({
        userName: [this.user ? this.user.userName : '', [Validators.minLength(3), Validators.required]],
        password: ['', [Validators.minLength(6), Validators.required]],
        passwordConfirm: ['', [Validators.pattern, Validators.required]]
      });
    } else {
      this.registerForm = this.formBuilder.group({
        userName: [this.user ? this.user.userName : '', [Validators.minLength(3), Validators.required]],
        currentPassword: ['', [Validators.required]],
        // tslint:disable-next-line:max-line-length
        password: ['', [Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.pattern]]
      });
      this.registerForm.get('userName').disable();
    }
  }

   // convenience getter for easy access to form fields
  get f(): any { return this.registerForm.controls; }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (!this.user) {
      const newUser: User = this.registerForm.value;
      this.userService.registerNewUser(newUser).toPromise().then((response) => {
        this.authService.executeAuthenticationService(newUser.userName, newUser.password).then((token) => {
          this.notifierService.notify('success', 'Welcome to locations web application');
          this.router.navigate(['locations']);
        });
      }).catch((err) => {
        this.notifierService.notify('error', err.error.description);
      });
    } else {
      this.authService.executeAuthenticationService(this.user.userName, this.registerForm.value.currentPassword, true).then((token) => {
          this.user.password = this.registerForm.value.password || this.registerForm.value.currentPassword;
          this.userService.updateUser(this.user).toPromise().then((user) => {
            this.authService.logout();
            this.authService.executeAuthenticationService(user.userName, this.user.password).then((newToken) => {
              this.notifierService.notify('success', 'Password is successfully updated');
              this.router.navigate(['locations']);
            });
        });
      }).catch((err) => {
        console.log(err);
        const message = err.error === 'INVALID_CREDENTIALS' && !this.user ? 'Invalid credentials' : 'Current password is wrong';
        this.notifierService.notify('error', message);
      });
    }
  }

  back(): void {
      this.location.back();
  }

  updatePasswordConfirmation(): void {
    // tslint:disable-next-line:triple-equals
    if (this.registerForm.value.password != '') {
      this.registerForm.controls['passwordConfirm']
        .setValidators([Validators.required, Validators.pattern(this.registerForm.value.password)]);
    } else {
      this.registerForm.controls['passwordConfirm'].clearValidators();
    }
  }

  ngDoCheck(): void {
    this.updatePasswordConfirmation();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
