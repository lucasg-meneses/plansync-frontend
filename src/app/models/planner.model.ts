import { Todo } from "./todo.model"

export interface Planner {
    id: string,

    title: string,
    month: number,
    year: number,
    notes: string,

    dateUpdated: Date,
    dateCreated: Date

    todos: Array<Todo>
}

export class PlannerModel implements Planner {
    id: string
    title: string
    month: number
    year: number
    notes: string
    dateUpdated: Date
    dateCreated: Date
    todos: Todo[] = []
    constructor(id: string, title: string, month: number,
        year: number, notes: string, dateUpdated: Date, dateCreated: Date) {
        this.id = id;
        this.title = title;
        this.month = month;
        this.year = year;
        this.notes = notes;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }


}