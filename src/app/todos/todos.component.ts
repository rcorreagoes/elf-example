import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodosRepository, first$, last$ } from './state/todos.repository';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

  value: any
  todos$!: Observable<Todo[]>;
  selectedTodo!: number;

  constructor(public todosRepo: TodosRepository) {}

  addTodo(value: any){
    this.todosRepo.addTodo(value);
    this.todos$ = this.todosRepo.getAll();
  }

  delete(){
    this.todosRepo.deleteEntity(this.selectedTodo);
  }

  getActiveId(){
    this.value = this.todosRepo.getActiveId();
  }

  getActiveIds(){
    this.todosRepo.getActiveIds().subscribe((result: Todo[])=>{
      this.value = result;
    })
  }

  getFirst(){
    first$.subscribe(result=> this.value = result)
  }

  getLast(){
    last$.subscribe(result=> this.value = result)
  }

  removeActive(){
    this.todosRepo.removeActive();
    this.getActiveId();
  }

  setActiveId(){
    this.todosRepo.setActiveId(this.selectedTodo);
    this.getActiveId();
  }

  setActiveIds(){
    this.todosRepo.setActiveIds([1,3]);
    this.getActiveIds();
  }

} 