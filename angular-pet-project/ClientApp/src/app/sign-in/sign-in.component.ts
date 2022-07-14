import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from '../app.feature.service';
import { SignInService } from './sign-in.service';
import { User } from '../models/user-model-sign-in';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(public featureService:FeatureService, private router: Router, private signInService: SignInService) 
  { 
    featureService.hide();
  }

  ngOnDestroy()
  {
    this.featureService.show();
  }

  btnClick()
  {
    this.u.NickName = this.NickName;
    this.u.Email = this.Email;
    this.signInService.loginUser(this.u);
  }

  btnNavigate= function () {
    this.router.navigateByUrl('/register');
  }

  u = { } as User;

  public NickName: string;

  public Email: string;

}
