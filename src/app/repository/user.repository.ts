import { Injectable } from '@angular/core';
import { createState, Store } from '@ngneat/elf';
import {
  deleteEntities,
  getAllEntities,
  resetActiveId,
  selectAllEntities,
  setActiveId,
  setEntities,
  upsertEntities,
  withActiveId,
  withEntities,
} from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

const userState = createState(withEntities<User>(), withActiveId());
const userStore = new Store({ name: 'user', ...userState });

@Injectable({ providedIn: 'root' })
export class UserRepository {
  users$ = userStore.pipe(selectAllEntities());

  constructor(private userService: UserService) {}

  delete(id: number): void {
    userStore.update(deleteEntities(id));
  }

  fetchCollection(): Observable<User[]> {
    return this.userService.getAll().pipe(
      map((users: User[]) => {
        userStore.update(setEntities(users));
        return users;
      })
    );
  }

  getActiveId(): User {
    return userStore.getValue().entities[userStore.getValue().activeId];
  }

  getAll(): User[] {
    return userStore.query(getAllEntities());
  }

  removeActive() {
    userStore.update(resetActiveId());
  }

  setActiveId(id: number | null) {
    if (id === null) {
      userStore.update(resetActiveId());
    } else {
      userStore.update(setActiveId(id));
    }
  }

  upsertUser(user: User) {
    userStore.update(upsertEntities(user));
  }
}
