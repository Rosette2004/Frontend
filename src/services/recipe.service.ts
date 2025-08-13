import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private api: ApiService) {}

  getAll(): Observable<Recipe[]> {
    return this.api.get<Recipe[]>('/recipe/');
  }
  getById(id: string) {
    return this.api.get<Recipe>(`/recipe/${id}`);
  }
  create(data: Partial<Recipe>) {
    return this.api.post<Recipe>('/recipe/', data);
  }
  update(id: string, data: Partial<Recipe>) {
    return this.api.put(`/recipe/${id}`, data);
  }
  delete(id: string) {
    return this.api.delete(`/recipe/${id}`);
  }
}
