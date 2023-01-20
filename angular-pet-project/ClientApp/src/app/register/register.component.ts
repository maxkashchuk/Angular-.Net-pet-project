import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FeatureService } from '../app.feature.service';
import { RegisterService } from './register.service';
import { User } from '../models/user-model-register';

import { CropCircleComponent } from '../cropper-circle/cropper-circle.component';

import { ThemeVariables, lyl, StyleRenderer } from '@alyle/ui';
import { LyDialog } from '@alyle/ui/dialog';

const STYLES = (theme: ThemeVariables) => {
  return {
    dialog: lyl `{
      background: #115466
      @media ${[
        theme.breakpoints['Small'],
        theme.breakpoints['XSmall'],
      ].join()} {
        border-radius: 0
      }
    }`
  };
};

@Component({
  selector: 'app-counter-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterService, StyleRenderer]
})
export class RegisterComponent {

  readonly classes = this.sRenderer.renderSheet(STYLES);

  constructor(public featureService:FeatureService, 
              private registerService: RegisterService,
              private _dialog: LyDialog,
              private sRenderer: StyleRenderer,
              private _cd: ChangeDetectorRef)
  {
    featureService.hide();

    this.minDate.setFullYear(this.minDate.getFullYear() - 100)

    this.currentDate.setFullYear(this.currentDate.getFullYear() - 16)
  }
  
  cropperActive(event: Event)
  {
    if(event !== null || event !== undefined)
    {
      this.open(event);
    }
  }

  open(event) {
    this._dialog.open<CropCircleComponent, Event>(CropCircleComponent, {
      width: ['30%', '100vw@XSmall@Small'],
      height: '100vh@XSmall@Small',
      maxWidth: '100vw@XSmall@Small',
      maxHeight: '100vh@XSmall@Small',
      data: event,
      containerClass: this.classes.dialog
    }).afterClosed.subscribe((result?: any) => {
      if(result !== undefined)
      {
        this.Image = result;
      }
      this._cd.markForCheck();
    });
  }

  ngOnDestroy()
  {
    this.featureService.show();
  }

  btnClick()
  {
    this.u.ActualName = this.ActualName;
    this.u.Nickname = this.Nickname;
    this.u.Email = this.Email;
    this.u.BirthDate = this.BirthDate;
    this.u.Image = this.Image;
    this.registerService.POST_User_Model(this.u);
  }

  currentDate:Date = new Date();

  minDate:Date = new Date();

  u = { } as User;

  public ActualName: string;

  public Nickname: string;

  public Email: string;

  public BirthDate: Date | null;

  public Image: any;

}