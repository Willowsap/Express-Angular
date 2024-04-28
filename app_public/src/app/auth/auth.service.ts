import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User from "../models/user.model";
import { Observable, Subject } from "rxjs";

@Injectable({
    'providedIn': 'root'
})
export default class AuthService {
    private API_URL = "http://localhost:3000/api/user/";
    private TOKEN_KEY = "token";

    private user: User | null = null;
    private userListener: Subject<User | null> = new Subject();

    private loggedIn: boolean = false;
    private loggedInListener: Subject<boolean> = new Subject();

    constructor(private http: HttpClient) {}

    register({user, password}: {user: User, password: string}) {
        this.http.post<{token: string, user: User} | {error: any}>(this.API_URL + "register",
            {
                name: user.name,
                email: user.email,
                password
            })
            .subscribe((response) => {
                if ("error" in response) {
                    console.log(response.error);
                }
                else {
                    const token = response.token;
                    localStorage.setItem(this.TOKEN_KEY, token);
                    this.user = response.user;
                    this.loggedIn = true;
                    this.userListener.next(this.user);
                    this.loggedInListener.next(true);
                }
            })
    }

    login({email, password}: {email: string, password: string}) {
        this.http.post<{token: string, user: User} | {error: any}>(this.API_URL + "login",
            {
                email,
                password,
            })
            .subscribe((response) => {
                if ("error" in response) {
                    console.log(response.error);
                }
                else {
                    const token = response.token;
                    localStorage.setItem(this.TOKEN_KEY, token);
                    this.user = response.user;
                    this.loggedIn = true;
                    this.userListener.next(this.user);
                    this.loggedInListener.next(true);
                }
            })
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    getLoggedInListener(): Observable<boolean> {
        return this.loggedInListener.asObservable();
    }

    getUser(): User | null {
        return this.user;
    }

    getUserListener(): Observable<User | null> {
        return this.userListener.asObservable();
    }

    autoLogIn(): void {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            // JWT expiration date is in seconds
            const expirationDate = new Date(tokenPayload.exp); 
            console.log(tokenPayload);
            console.log(expirationDate);
            console.log(new Date());
            if (new Date().getTime() < expirationDate.getTime()) {
                this.retrieveUser(tokenPayload.email);
            }
        }
    }

    retrieveUser(email: string): void {
        this.http.get<User | null>(this.API_URL + email)
            .subscribe((user: User | null) => {
                if (user) {
                    this.user = user;
                    this.userListener.next(user);
                }
            });
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
        this.user = null;
        this.loggedIn = false;
        this.userListener.next(null);
        this.loggedInListener.next(false);
    }

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY) ?? "";
    }
}