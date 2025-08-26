import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getCounts(): Observable<{ count: number }> {
    return this.api.get<{ count: number }>('/user/count');
  }
}
