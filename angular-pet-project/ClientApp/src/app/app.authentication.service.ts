import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import jwt_decode from 'jwt-decode';

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

    getDecodedAccessToken(token: string): any {
      try 
      {
        return jwt_decode(token);
      } 
      catch(Error) 
      {
        return null;
      }
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