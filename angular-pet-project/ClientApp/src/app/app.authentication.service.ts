import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class AuthService {

    isLogged = () => {
        return JSON.parse(sessionStorage.getItem("isLogged"));
    }

    logOut = () => {
        sessionStorage.clear();
        localStorage.clear();
    }

}