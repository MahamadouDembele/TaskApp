import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {SngleTaskComponent} from "./sngle-task/sngle-task.component";


const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'task/:id', component: SngleTaskComponent },
  { path: 'add', component: AddTaskComponent },
  { path: '', component: TaskListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
