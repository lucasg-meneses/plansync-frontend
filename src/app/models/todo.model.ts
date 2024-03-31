import { Time, WeekDay } from "@angular/common";
import { Planner } from "./planner.model";

export interface Todo {
    id: string,
    
    title: string,
    description: string,
    planner:Planner,
    weekday:WeekDay,
    
    startTime: string,
    endTime: string,

    dateUpdated: Date,
    dateCreated:Date
}
