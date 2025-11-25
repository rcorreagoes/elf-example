import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { USER_MOCK } from './user-mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getAll(): Observable<User[]> {
    return of(USER_MOCK);
  }
}
