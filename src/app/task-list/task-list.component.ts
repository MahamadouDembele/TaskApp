import {Component, Input, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Task} from "../models/task";
import {TaskService} from "../services/task.services.";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() task!: Task;

  tasks$!: Observable<Task[]>;
  constructor(private faceSnapsService: TaskService,
              private router : Router) {}

  ngOnInit(): void {
    this.tasks$ = this.faceSnapsService.getAllTasks();
  }

  onViewTask(taskId: number) {
    if(taskId) {
      this.router.navigate(['/task', taskId]);
    }
  }

  onDelete(taskId: number) {
    this.faceSnapsService.deleteTask(taskId).pipe(
      tap(() => {
        this.router.navigateByUrl('/tasks');
        location.reload();
      })
    ).subscribe();
  }
  onComplete(taskId: number, completed: boolean) {
    const compType = completed ? 'complete' : 'nonComplete';
    this.faceSnapsService.completeTask(taskId, compType).subscribe();
  }


}
