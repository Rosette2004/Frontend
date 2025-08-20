import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="container">
      <div class="header">
        <h2>Recipes</h2>
        <button mat-raised-button color="accent" (click)="newRecipe()">
          + New Recipe
        </button>
      </div>

      <!-- 🔎 Search Bar -->
      <div class="search">
        <input
          type="text"
          placeholder="Search recipes..."
          [(ngModel)]="searchTerm"
          (input)="load()"
        />
      </div>

      <div *ngIf="loading" class="center"><mat-spinner></mat-spinner></div>

      <div class="recipe-grid">
        <mat-card
          *ngFor="let r of recipes"
          class="recipe-card mat-elevation-z4"
        >
          <img
            mat-card-image
            *ngIf="r.coverImage"
            [src]="
              r.coverImage.startsWith('/uploads/')
                ? baseUrl + r.coverImage
                : baseUrl + '/uploads/' + r.coverImage
            "
          />
          <mat-card-title>{{ r.title }}</mat-card-title>
          <mat-card-content>
            <p class="muted">
              {{ r.ingredients?.slice(0, 4).join(', ')
              }}<span *ngIf="r.ingredients?.length > 4">...</span>
            </p>
            <p class="muted small">Time: {{ r.time || '—' }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="view(r._id)">View</button>
            <button mat-button (click)="edit(r._id)">Edit</button>
            <button mat-button color="warn" (click)="remove(r._id)">
              Delete
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <div *ngIf="!loading && recipes.length === 0" class="empty">
        No recipes yet. Click "New Recipe" to add one.
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1100px;
        margin: 20px auto;
        padding: 0 16px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .search {
        margin-bottom: 16px;
      }
      .recipe-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      .recipe-card {
        width: 320px;
      }
      .muted {
        color: rgba(0, 0, 0, 0.6);
      }
      .small {
        font-size: 0.9rem;
      }
      .center {
        display: flex;
        justify-content: center;
        padding: 40px 0;
      }
      .empty {
        text-align: center;
        color: rgba(0, 0, 0, 0.6);
        padding: 40px 0;
      }
    `,
  ],
})
export class Recipes implements OnInit {
  recipes: any[] = [];
  loading = false;
  searchTerm = '';
  baseUrl = environment.apiUrl; // 👈 prepend this
  constructor(private rs: RecipeService, private router: Router) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.rs.getAll(this.searchTerm).subscribe({
      next: (r) => {
        this.recipes = r || [];
        this.loading = false;
      },
      error: () => {
        this.recipes = [];
        this.loading = false;
      },
    });
  }
  view(id: string) {
    this.router.navigate(['/recipes', id]);
  }
  edit(id: string) {
    this.router.navigate(['/recipes/edit', id]);
  }
  newRecipe() {
    this.router.navigate(['/recipes/new']);
  }
  remove(id: string) {
    if (confirm('Delete this recipe?')) {
      this.rs.delete(id).subscribe(() => this.load());
    }
  }
}
