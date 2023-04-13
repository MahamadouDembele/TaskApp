import { Component , OnInit} from '@angular/core';
import {TaskService} from "../services/task.services.";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {Task} from "../models/task";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{


  title!: string;
  description!: string;

  taskForm!: FormGroup;

  taskPreview$!: Observable<Task>;
  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {

    this.taskForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
    }, {
      updateOn: 'blur'
    });
    this.taskPreview$ = this.taskForm.valueChanges.pipe(
      map(taskValue => ({
        ...taskValue,
        createdDate: new Date(),
        completed: false,
        id: 0
      }))
    );
  }

  addTask() {
    this.taskService.addTask(this.taskForm.value).pipe(
      tap(() => this.router.navigateByUrl('tasks'))
    ).subscribe();
  }


}
