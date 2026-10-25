import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private storageKey = 'my_schedule';

    private scheduleSubject = new BehaviorSubject<Course[]>(this.getStoredSchedule());
    schedule$ = this.scheduleSubject.asObservable();

    constructor() {}

    private getStoredSchedule(): Course[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    getSchedule(): Course[] {
        return this.scheduleSubject.value;
    }

    addCourse(course: Course): boolean {
        const current = this.getSchedule();
        const exists = current.some(c => c.courseCode === course.courseCode);

        if (exists) {
        alert('Kursen finns redan i ditt ramschema!');
        return false;
        }

        const updated = [...current, course];
        this.saveSchedule(updated);
        return true;
    }

    removeCourse(courseCode: string): void {
        const current = this.getSchedule();
        const updated = current.filter(c => c.courseCode !== courseCode);
        this.saveSchedule(updated);
    }

    private saveSchedule(courses: Course[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(courses));
        this.scheduleSubject.next(courses);
    }

    getTotalPoints(): number {
        return this.getSchedule().reduce((sum, c) => sum + c.points, 0);
    }
}