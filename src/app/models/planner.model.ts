import { Todo } from "./todo.model"

export interface Planner {
    id: string,
    
    title: string,
    month: number,
    year: number,
    notes: string,
    
    dateUpdated: Date,
    dateCreated:Date
    
    todos: Array<Todo>
}
