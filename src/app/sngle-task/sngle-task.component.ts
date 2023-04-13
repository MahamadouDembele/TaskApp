import { Component, OnInit } from '@angular/core';
import {TaskService} from "../services/task.services.";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../models/task";
import {Observable} from "rxjs";


@Component({
  selector: 'app-sngle-task',
  templateUrl: './sngle-task.component.html',
  styleUrls: ['./sngle-task.component.css']
})
export class SngleTaskComponent implements OnInit{

  task$!: Observable<Task>;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
      const taskId = +this.route.snapshot.params['id'];
      this.task$ = this.taskService.getTaskById(taskId);
    };
  }




