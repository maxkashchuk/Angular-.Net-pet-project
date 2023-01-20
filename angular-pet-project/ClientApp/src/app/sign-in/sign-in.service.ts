import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-model-sign-in';
import { Router } from '@angular/router';
import { AuthService } from '../app.authentication.service';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@Injectable({
    providedIn: 'root'
})

export class SignInService {
    
    private url_api: string = "https://localhost:44316/api/auth/login";

    @Output() IsLoggedIn: EventEmitter<any> = new EventEmitter<any>(); 

    constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

    public loginUser = (model: User) => {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(model);
        this.http.post(this.url_api, body, {'headers':headers, observe: 'response'}).subscribe(data => { }, (res) => 
        {
            if(res.status == 200)
            {
               localStorage.setItem("token", res.error.text);
               sessionStorage.setItem("isLogged", JSON.stringify(true));
               this.IsLoggedIn.emit(this.auth.getDecodedAccessToken(localStorage.getItem('token')).Image);
               this.router.navigateByUrl('/');
            }
        });
    }

    getAvatar() 
    { 
        return this.IsLoggedIn;
    } 
}