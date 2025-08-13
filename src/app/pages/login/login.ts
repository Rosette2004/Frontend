import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()" class="auth-form">
        <mat-form-field class="full"
          ><input
            matInput
            placeholder="Email"
            [(ngModel)]="email"
            name="email"
            required
        /></mat-form-field>
        <mat-form-field class="full"
          ><input
            matInput
            placeholder="Password"
            [(ngModel)]="password"
            name="password"
            type="password"
            required
        /></mat-form-field>
        <div class="actions">
          <button mat-raised-button color="primary" type="submit">Login</button>
          <a mat-button routerLink="/signup">Create account</a>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 480px;
        margin: 36px auto;
        padding: 0 16px;
      }
      .full {
        width: 100%;
      }
      .actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }
    `,
  ],
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}
  onSubmit() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/recipes']);
      },
      error: (err) => alert(err.error?.message || 'Login failed'),
    });
  }
}
