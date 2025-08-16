import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-form',
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
      <h2>{{ isEdit ? 'Edit' : 'New' }} Recipe</h2>
      <form (ngSubmit)="save()" class="form">
        <mat-form-field class="full">
          <input
            matInput
            placeholder="Title"
            [(ngModel)]="form.title"
            name="title"
            required
          />
        </mat-form-field>

        <mat-form-field class="full">
          <input
            matInput
            placeholder="Ingredients (comma separated)"
            [(ngModel)]="ingredientsRaw"
            name="ingredients"
          />
        </mat-form-field>

        <mat-form-field class="full">
          <textarea
            matInput
            placeholder="Instructions"
            [(ngModel)]="form.instructions"
            name="instructions"
            rows="6"
          ></textarea>
        </mat-form-field>

        <mat-form-field class="full">
          <input
            matInput
            placeholder="Time (e.g., 20 mins)"
            [(ngModel)]="form.time"
            name="time"
          />
        </mat-form-field>

        <mat-form-field class="full">
          <input
            matInput
            placeholder="Cover Image URL"
            [(ngModel)]="form.coverImage"
            name="coverImage"
          />
        </mat-form-field>

        <div class="actions">
          <button mat-raised-button color="primary" type="submit">
            {{ isEdit ? 'Save' : 'Create' }}
          </button>
          <button mat-button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 700px;
        margin: 20px auto;
        padding: 0 16px;
      }
      .full {
        width: 100%;
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .actions {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
    `,
  ],
})
export class RecipeForm implements OnInit {
  isEdit = false;
  form: any = {
    title: '',
    ingredients: [],
    instructions: '',
    time: '',
    coverImage: '',
  };
  ingredientsRaw = '';
  id?: string;

  constructor(
    private rs: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;
    if (this.isEdit) {
      this.rs.getById(this.id!).subscribe((r) => {
        this.form = r;
        this.ingredientsRaw = (r.ingredients || []).join(', ');
      });
    }
  }

  save() {
    this.form.ingredients = this.ingredientsRaw
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s);
    if (this.isEdit) {
      this.rs
        .update(this.id!, this.form)
        .subscribe(() => this.router.navigate(['/recipes']));
    } else {
      this.rs
        .create(this.form)
        .subscribe(() => this.router.navigate(['/recipes']));
    }
  }
  cancel() {
    this.router.navigate(['/recipes']);
  }
}
