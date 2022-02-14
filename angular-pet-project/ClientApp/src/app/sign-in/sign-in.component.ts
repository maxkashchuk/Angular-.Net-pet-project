import { Component, OnDestroy } from '@angular/core';
import { FeatureService } from '../app.feature.service';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [SignInService]
})
export class SignInComponent {

  constructor(public featureService:FeatureService, private signInService: SignInService) 
  {
    featureService.hide();

    this.minDate.setFullYear(this.minDate.getFullYear() - 100)
  }

  ngOnDestroy()
  {
    this.featureService.show();
  }

  btnClick()
  {
    this.signInService.postData(this.name, this.email, this.birth);
  }

  currentDate:Date = new Date();

  minDate:Date = new Date();

  name;

  surname;

  email;

  birth: Date | null;

}
