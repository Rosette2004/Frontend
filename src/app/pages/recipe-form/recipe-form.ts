import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CollectionService } from '../../../services/collection.service';

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

        <!-- Cover Image File Upload -->
        <div class="file-upload">
          <input
            type="file"
            #fileInput
            (change)="onFileSelected($event)"
            accept="image/*"
            hidden
          />
          <button
            mat-raised-button
            color="accent"
            type="button"
            (click)="fileInput.click()"
          >
            Upload Image
          </button>
          <span class="file-name" *ngIf="selectedFile">{{
            selectedFile.name
          }}</span>
        </div>

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
        max-width: 800px;
        margin: 40px auto;
        padding: 24px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      h2 {
        margin-bottom: 20px;
        color: #333;
        font-weight: 500;
      }
      .full {
        width: 100%;
      }
      .form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 20px;
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
  selectedFile?: File;

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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    this.form.ingredients = this.ingredientsRaw
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s);

    const formData = new FormData();
    formData.append('title', this.form.title);
    formData.append('instructions', this.form.instructions);
    formData.append('ingredients', this.form.ingredients.join(','));
    formData.append('time', this.form.time || '');
    if (this.selectedFile) {
      formData.append('coverImage', this.selectedFile);
    }

    if (this.isEdit) {
      this.rs
        .update(this.id!, formData)
        .subscribe(() => this.router.navigate(['/recipes']));
    } else {
      this.rs
        .create(formData)
        .subscribe(() => this.router.navigate(['/recipes']));
    }
  }
  cancel() {
    this.router.navigate(['/recipes']);
  }
}
