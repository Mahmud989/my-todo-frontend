import {Component, OnInit} from '@angular/core';
import {TodoClientService} from "../services/todo-client.service";
import {TodoModel} from "../models/todoModels";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todos: TodoModel[] = [];
  index: number = 1;
  addingOnProgress = false;
  content = ''

  constructor(private todoClientService: TodoClientService) {
  }

  ngOnInit(): void {
    this.loadAllTodos();
  }

  addNewTodo() {
    this.addingOnProgress = true;

    this.todoClientService.createTodo(this.content).subscribe((value: TodoModel) => {
      this.content = '';
      this.todos.push(value);
    }).add(() => {
      this.addingOnProgress = false;
    });
    console.log(this.todos)
  }

  loadAllTodos() {
    this.addingOnProgress = true;
    this.todoClientService.getAllTodos().subscribe((value: TodoModel[]) => {
      this.todos = value;
    }).add(() => {
      this.addingOnProgress = false;
    });
  }


}
