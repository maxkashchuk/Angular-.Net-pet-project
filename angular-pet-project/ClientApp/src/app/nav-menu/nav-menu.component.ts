import { Component, OnInit  } from '@angular/core';
import { FeatureService } from '../app.feature.service';
import { AuthService } from '../app.authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  public isUserAuthenticated: boolean;

  public lat;

  public lng;

  public dataResponse;

  constructor(protected featureService:FeatureService, private router: Router, protected authService: AuthService) { }

  showState = ["none", "flex"];

  logOut()
  {
    sessionStorage.removeItem("isLogged");
  }
  
}