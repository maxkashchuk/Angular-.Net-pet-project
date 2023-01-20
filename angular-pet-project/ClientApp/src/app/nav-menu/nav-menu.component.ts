import { Component, OnInit  } from '@angular/core';
import { FeatureService } from '../app.feature.service';
import { AuthService } from '../app.authentication.service';
import { Router } from '@angular/router';
import { SignInService as LoginService} from '../sign-in/sign-in.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public isUserAuthenticated: boolean;

  public lat;

  public lng;

  public dataResponse;

  public avatar; //  = this.authService.getDecodedAccessToken(localStorage.getItem('token')).Image;

  constructor(protected featureService:FeatureService, private router: Router, public authService: AuthService, private logService: LoginService) { 
    console.log(this.avatar);
  }

  ngOnInit() 
  { 
    this.logService.getAvatar().subscribe((customObject) => 
    { 
      console.log("Component is notified of successfull login!");
      this.avatar = customObject;
    }); 
  } 

  showState = ["none", "flex"];

  logOut()
  {
    sessionStorage.removeItem("isLogged");
  }
  
}