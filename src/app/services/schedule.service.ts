import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
    })
    export class ScheduleService {
    private storageKey = 'miun_schedule';
    private scheduleSubject = new BehaviorSubject<Course[]>(this.loadFromStorage());
    
    schedule$: Observable<Course[]> = this.scheduleSubject.asObservable();

    constructor() {}

    private loadFromStorage(): Course[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    private saveToStorage(schedule: Course[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(schedule));
        this.scheduleSubject.next(schedule);
    }

    addCourse(course: Course): void {
        const currentSchedule = this.scheduleSubject.value;
        // Kontrollera att kursen inte redan finns
        if (!currentSchedule.some(c => c.courseCode === course.courseCode)) {
        const updated = [...currentSchedule, course];
        this.saveToStorage(updated);
        }
    }

    removeCourse(courseCode: string): void {
        const currentSchedule = this.scheduleSubject.value;
        const updated = currentSchedule.filter(c => c.courseCode !== courseCode);
        this.saveToStorage(updated);
    }

    getTotalPoints(): number {
        return this.scheduleSubject.value.reduce((sum, course) => sum + course.points, 0);
  }
}