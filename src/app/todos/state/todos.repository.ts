import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { addEntities, deleteEntities, resetActiveId, resetActiveIds, selectAllEntities, selectAllEntitiesApply, selectFirst, selectLast, setActiveId, setActiveIds, updateEntities, withActiveId, withActiveIds, withEntities } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosProps {
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
}

const store = createStore(
  { name: 'todos' },
  withProps<TodosProps>({ filter: 'ALL' }),
  withEntities<Todo>(),
  withActiveId(),
  withActiveIds()
);

export const first$ = store.pipe(selectFirst());
export const last$ = store.pipe(selectLast());

@Injectable({ providedIn: 'root' })
export class TodosRepository {
  todos$ = store.pipe(selectAllEntities());
  filter$ = store.pipe(select((state) => state.filter));

  visibleTodos$ = this.filter$.pipe(
    switchMap((filter) => {
      return store.pipe(
        selectAllEntitiesApply({
          filterEntity({ completed }) {
            if (filter === 'ALL') return true;
            return filter === 'COMPLETED' ? completed : !completed;
          },
        })
      );
    })
  );

  addTodo(title: Todo['title']) {
    store.pipe(selectLast()).subscribe(result=>{
      let id: number = 1;
      if(result) id = Number(result)+1;
      store.update(addEntities({ id: Number(result) + 1, title, completed: false }));
    })
  }
  
  deleteEntity(id: number) {
    store.update(deleteEntities(id));
  }

  getActiveId(): any{
    return store.getValue().entities[store.getValue().activeId];
  }

  getActiveIds(): Observable<Todo[]>{
    return store.pipe(
      select((state) => Object.values(state.entities)),
      map((todos: Todo[]) => todos.filter(todo => Object.values(store.getValue().activeIds)[0].includes(todo.id)))
    );
  }

  getAll(): Observable<Todo[]> {
    return store.pipe(
      select((state) => Object.values(state.entities))
    );
  }

  removeActive(){
    store.update(resetActiveId());
    store.update(resetActiveIds());
  }

  setActiveId(id: number){
    store.update(setActiveId(id));
  }

  setActiveIds(id: number[]){
    store.update(setActiveIds([id]));
  }
  
  updateCompleted(id: Todo['id']) {
    store.update(
      updateEntities(id, (entity) => ({
        ...entity,
        completed: !entity.completed,
      }))
    );
  }

  updateFilter(filter: TodosProps['filter']) {
    store.update(setProp('filter', filter));
  }
}
