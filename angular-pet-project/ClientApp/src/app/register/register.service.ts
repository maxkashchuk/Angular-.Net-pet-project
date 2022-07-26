import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-model-register';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    
    private url_api: string = "https://localhost:44316/api/auth/register";

    constructor(private http: HttpClient, private router: Router) { }

    POST_User_Model(model: User)
    {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(model);
        this.http.post(this.url_api, body, {'headers':headers, observe: 'response'}).subscribe(response => 
        {
            if(response.status == 200)
            {
                this.router.navigateByUrl('/sign-in');
            }
        });
    }
}