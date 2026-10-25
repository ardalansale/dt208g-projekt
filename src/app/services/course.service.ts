import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
  // Sökväg till JSON-filen
    private jsonUrl = '/miun_courses.json';

    constructor(private http: HttpClient) {}

  // Hämta kurser från JSON-filen
    getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.jsonUrl);
    }
}