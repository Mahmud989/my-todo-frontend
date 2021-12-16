import {fakeAsync, TestBed} from '@angular/core/testing';

import {TodoClientService} from './todo-client.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {of} from "rxjs";
import {TodoModel} from "../models/todoModels";
import {HttpClientModule} from "@angular/common/http";

describe('TodoClientServiceService', () => {
  let service: TodoClientService;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TodoClientService]
    });
    service = TestBed.inject(TodoClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return todo list', (done) => {
    service.getAllTodos().subscribe(posts => {
      expect(posts.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });
  it('should return todo after adding new todo', (done) => {
    const content = 'new content'
    service.createTodo(content).subscribe(post => {
      expect(post.content).toBe(content);
      done();
    });
  });
});
