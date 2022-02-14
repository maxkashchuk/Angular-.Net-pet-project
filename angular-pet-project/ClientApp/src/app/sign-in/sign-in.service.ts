import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignInService{

    constructor(private http: HttpClient) { }

    postId;
      
    postData(name, email, birth) {
        this.http.post<any>('https://localhost:44316/api/user/adduser', { Name: name, Email: email, BirthDate: birth }).subscribe(data => {
            this.postId = data.id;
        })
    }
}