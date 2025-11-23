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
import { Observable, of } from 'rxjs';
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

  fetchCollection(): Observable<void> {
    return this.userService.getAll().pipe(
      map((users: User[]) => {
        userStore.update(setEntities(users));
        return;
      })
    );
  }

  getActiveId(): User {
    return userStore.getValue().entities[userStore.getValue().activeId];
  }

  getAll(): User[] {
    return userStore.query(getAllEntities());
  }

  /**
   * This method exists only because there is no backend/database connection.
   * In a real scenario, the backend/database would return the new id after insert.
   */
  private getLastUser(): User | null {
    const all = userStore.query(getAllEntities());
    return all.length > 0 ? all[all.length - 1] : null;
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

  upsertUser(user: User): Observable<void> {
    if (!user.id) {
      /**
       * Check the getLastUser comment
       */
      const last = this.getLastUser();
      user.id = last ? last.id + 1 : 1;
    }
    userStore.update(upsertEntities(user));

    return of(void 0);
  }
}
