import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService, private router: Router) {}

  signup(
    // name: string,
    email: string,
    // photo: string,
    password: string
    // confirmPassword: string
  ) {
    return this.api
      .post<any>('/signUp', {
        // name,
        email,
        // photo,
        password,
        // confirmPassword,
      })
      .pipe(
        tap((res) => {
          if (res?.token) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  login(email: string, password: string) {
    return this.api.post<any>('/login', { email, password }).pipe(
      tap((res) => {
        if (res?.token) localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}
