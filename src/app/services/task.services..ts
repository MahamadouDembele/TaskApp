import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, switchMap} from "rxjs";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  addTask(formValue: { title: string, description: string, completed: boolean, dueDate: Date }): Observable<Task> {
    return this.getAllTasks().pipe(
      map(tasks => [...tasks].sort((a,b) => a.id - b.id)),
      map(sortedTasks => sortedTasks[sortedTasks.length - 1]),
      map(previousTasks => ({
        ...formValue,
        completed:false,
        dueDate: new Date(),
        id: previousTasks.id + 1
      })),
      switchMap(newTask => this.http.post<Task>(
        'http://localhost:3000/tasks',
        newTask)
      )
    );
  }
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks');
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/tasks/${taskId}`);
  }

  deleteTask(taskId: number):Observable<Task>{
    return this.http.delete<Task>(`http://localhost:3000/tasks/${taskId}`);
  }

  completeTask(taskId: number, compType: 'complete' | 'nonComplete'): Observable<Task> {
    return this.getTaskById(taskId).pipe(
      map(task => ({
        ...task,
        completed: compType === 'complete' ? 1 : 0
      })),
      switchMap(updatedTask => this.http.put<Task>(
        `http://localhost:3000/tasks/${taskId}`,
        updatedTask)
      )
    );
  }

}
