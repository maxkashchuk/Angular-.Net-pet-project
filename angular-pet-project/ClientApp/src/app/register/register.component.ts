import { Component, OnDestroy } from '@angular/core';
import { FeatureService } from '../app.feature.service';
import { RegisterService } from './register.service';
import { User } from '../models/user-model-register';

@Component({
  selector: 'app-counter-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent {

  constructor(public featureService:FeatureService, private registerService: RegisterService) 
  {
    featureService.hide();

    this.minDate.setFullYear(this.minDate.getFullYear() - 100)

    this.currentDate.setFullYear(this.currentDate.getFullYear() - 16)
  }

  ngOnDestroy()
  {
    this.featureService.show();
  }

  btnClick()
  {
    this.u.ActualName = this.ActualName;
    this.u.NickName = this.NickName;
    this.u.Email = this.Email;
    this.u.BirthDate = this.BirthDate;
    this.u.Image = this.Image;
    this.registerService.POST_User_Model(this.u);
  }

  currentDate:Date = new Date();

  minDate:Date = new Date();

  u = { } as User;

  public ActualName: string;

  public NickName: string;

  public Email: string;

  public BirthDate: Date | null;

  public Image: any;

}
