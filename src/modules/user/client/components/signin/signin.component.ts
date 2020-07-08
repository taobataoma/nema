import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {AuthenticationService} from '../../services/authentication.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  signinForm;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private notification: NzNotificationService,
    private authenticationService: AuthenticationService
  ) {
    this.signinForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  ngOnInit(): void {
  }

  onSubmitForm(signinData): void {
    console.log('-= authenticationService.user :');
    console.log(this.authenticationService.user);

    // tslint:disable-next-line:forin
    for (const i in this.signinForm.controls) {
      this.signinForm.controls[i].markAsDirty();
      this.signinForm.controls[i].updateValueAndValidity();
    }

    if (!this.signinForm.valid) {
      return;
    }

    console.log(signinData);
    this.signin(signinData);
  }

  /**
   * Sign in
   */
  signin(user) {
    if (!user) {
      return;
    }

    this.authService
      .signin(
        user,
        (res) => {
          this.authenticationService.user = res;
          this.signinForm.reset();

          console.log(this.authenticationService.user);
        },
        (err) => {
          console.log(err.error.message);
          this.signinForm.reset();
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
