import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {
  signinForm;

  constructor(
    private formBuilder: FormBuilder
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
    console.log(signinData);

    // tslint:disable-next-line:forin
    for (const i in this.signinForm.controls) {
      this.signinForm.controls[i].markAsDirty();
      this.signinForm.controls[i].updateValueAndValidity();
    }
  }
}
