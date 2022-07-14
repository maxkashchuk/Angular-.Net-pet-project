import { Component, OnInit  } from '@angular/core';
import { FeatureService } from '../app.feature.service';
import { AuthService } from '../app.authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  public isUserAuthenticated: boolean;

  constructor(protected featureService:FeatureService, protected authService: AuthService) { }

  showState = ["none", "flex"];
  
}