import { Component } from '@angular/core';
import { FeatureService } from '../app.feature.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(public featureService:FeatureService) 
  { 
    featureService.hide();
  }

}
