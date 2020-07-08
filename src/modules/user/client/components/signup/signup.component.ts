import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthenticationService} from '../../services/authentication.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  signupForm;

  private authenticationService: AuthenticationService;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private notification: NzNotificationService,
    authenticationService: AuthenticationService
  ) {
    this.authenticationService = authenticationService;
    this.signupForm = this.formBuilder.group({
      fullname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      vPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  ngOnInit(): void {
  }

  onSubmitForm(signupData): void {
    console.log('-= authenticationService.user: ');
    console.log(this.authenticationService.user);

    // tslint:disable-next-line:forin
    for (const i in this.signupForm.controls) {
      this.signupForm.controls[i].markAsDirty();
      this.signupForm.controls[i].updateValueAndValidity();
    }

    if (!this.signupForm.valid) {
      return;
    }

    this.signup(signupData);
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.signupForm.controls.vPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.signupForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  /**
   * Sign up
   */
  signup(user) {
    if (!user) {
      return;
    }

    this.authService
      .signup(
        user,
        (res) => {
          console.log(res);
          this.signupForm.reset();
        },
        (err) => {
          console.log(err.error.message);
          this.signupForm.reset();
          this.showNotification(err.error.message);
        }
      );
  }

  showNotification(msg): void {
    this.notification.blank(
      'ERROR',
      msg,
      {
        nzPlacement: 'bottomRight',
        nzStyle: {
          maxWidth: '600px',
        },
        nzClass: 'test-class'
      }
    );
  }

}
