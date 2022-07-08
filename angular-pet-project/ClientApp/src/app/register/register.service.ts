import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/usermodel';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    
    private url_api: string = "https://localhost:44316/api/auth/register";

    constructor(private http: HttpClient) { }

    POST_User_Model(model: User)
    {
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(model);
        console.log(body)
        return this.http.post(this.url_api, body, {'headers':headers, observe: 'response'}).subscribe(data => { }, (res) => 
        {
            if (res.status == 200) {
              // some code
            }
        });
    }
}