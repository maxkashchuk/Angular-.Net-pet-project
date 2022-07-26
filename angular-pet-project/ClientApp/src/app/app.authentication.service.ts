import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {}

    isLogged = () => {
        return JSON.parse(sessionStorage.getItem("isLogged"));
    }

    logOut = () => {
        sessionStorage.clear();
        localStorage.clear();
    }

    getLocation(): Promise<any>
    {
      return new Promise((resolve, reject) => {
  
        navigator.geolocation.getCurrentPosition(resp => {
  
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          },
          err => {
            reject(err);
          });
      });
  
    }

}