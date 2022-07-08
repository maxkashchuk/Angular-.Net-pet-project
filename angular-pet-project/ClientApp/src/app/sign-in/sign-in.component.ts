import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from '../app.feature.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(public featureService:FeatureService, private router: Router) 
  { 
    featureService.hide();
  }

  ngOnDestroy()
  {
    this.featureService.show();
  }

  btnClick()
  {

  }

  btnNavigate= function () {
    this.router.navigateByUrl('/register');
  }

  public NickName: string;

  public Email: string;

}
