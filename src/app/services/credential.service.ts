import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CredentialService {
  public user = {
    username: "pankaj123",
    password: "pkj123456"
  };
  private loggedIn = false;
  constructor() {
    this.loggedIn = !!localStorage.getItem('access_token');
  }
  login(data): Promise<boolean> {
    if (data.username == this.user.username && data.password == this.user.password) {
      localStorage.setItem('access_token', "login_ho_gaya");
    }
    return Promise.resolve(this.loggedIn);
  }
  isLoggedIn() {
    return this.loggedIn;
  }
}