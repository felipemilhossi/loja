import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/validator/custom.validator';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UserUtil } from 'src/app/Utils/user.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private route: Router,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.form.disable();

    var login = this.form.controls['email'].value;
    if (login.includes("email")) {
      this.service.authenticate(this.form.value)
        .subscribe(
          (res: User) => {
            UserUtil.save(res);
            this.form.enable();
            this.route.navigate(['']);
          }
        );
    }
    else {
      alert("E-mail ou senha inválido!");
      this.form.enable();
    }

  }

}
