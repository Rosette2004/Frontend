import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Recipe } from '../models/recipe.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private api: ApiService) {}

  // getAll(): Observable<Recipe[]> {
  //   return this.api.get<Recipe[]>('/recipe/');
  // }

  getAll(search: string = ''): Observable<Recipe[]> {
    return this.api.get<Recipe[]>(`/recipe/?search=${search}`);
  }
  getById(id: string) {
    return this.api.get<Recipe>(`/recipe/${id}`);
  }
  create(data: Partial<Recipe> | FormData) {
    return this.api.post<Recipe>('/recipe/', data);
  }
  update(id: string, data: Partial<Recipe> | FormData) {
    return this.api.put(`/recipe/${id}`, data);
  }
  delete(id: string) {
    return this.api.delete(`/recipe/${id}`);
  }
}
