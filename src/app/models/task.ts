export class Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;

  constructor(id: number, title: string, description: string, completed: boolean, dueDate: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.dueDate = dueDate;
  }
}
