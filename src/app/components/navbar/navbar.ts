import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z4">
      <span class="brand" routerLink="/">Recipe Manager</span>
      <span class="spacer"></span>

      <a mat-button routerLink="/recipes">Recipes</a>
      <a mat-button routerLink="/recipes/new">Add Recipe</a>

      <ng-container *ngIf="!auth.isLoggedIn(); else loggedIn">
        <a mat-button routerLink="/login">Login</a>
        <a mat-button routerLink="/signup">Signup</a>
      </ng-container>

      <ng-template #loggedIn>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon> Logout
        </button>
      </ng-template>
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .brand {
        font-weight: 700;
        cursor: pointer;
      }
    `,
  ],
})
export class Navbar {
  constructor(public auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
