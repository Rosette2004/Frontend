import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  constructor(private api: ApiService) {}

  getAll(): Observable<any[]> {
    return this.api.get<any[]>('/collection');
  }

  getById(id: string): Observable<any> {
    return this.api.get<any>(`/collection/${id}`);
  }

  create(data: { name: string; description?: string }): Observable<any> {
    return this.api.post('/collection', data);
  }

  addRecipe(collectionId: string, recipeId: string): Observable<any> {
    return this.api.post('/collection/add-recipe', { collectionId, recipeId });
  }

  delete(id: string): Observable<any> {
    return this.api.delete(`/collection/${id}`);
  }
}
