import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  schedule: Course[] = [];
  
  searchTerm: string = '';
  selectedSubject: string = '';
  subjects: string[] = [];
  sortField: string = '';

  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    // Hämta alla kurser
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      this.subjects = [...new Set(data.map(c => c.subject))];
    });

    // Lyssna på ramschemat för att veta vilka kurser som är tillagda
    this.scheduleService.schedule$.subscribe(scheduleData => {
      this.schedule = scheduleData;
    });
  }

  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesSubject = this.selectedSubject ? course.subject === this.selectedSubject : true;
      return matchesSearch && matchesSubject;
    });
    if (this.sortField) {
      this.sortCourses();
    }
  }

  sortCourses(): void {
    if (this.sortField === 'code') {
      this.filteredCourses.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
    } else if (this.sortField === 'name') {
      this.filteredCourses.sort((a, b) => a.courseName.localeCompare(b.courseName));
    } else if (this.sortField === 'points') {
      this.filteredCourses.sort((a, b) => b.points - a.points);
    }
  }

  // Kontrollerar om en kurs redan finns i schemat - ta bort direkt i Sök
  isCourseInSchedule(courseCode: string): boolean {
    return this.schedule.some(c => c.courseCode === courseCode);
  }

  // Växla mellan att lägga till och ta bort direkt från listan - ta bort direkt i Sök
  toggleCourse(course: Course): void {
    if (this.isCourseInSchedule(course.courseCode)) {
      this.scheduleService.removeCourse(course.courseCode);
    } else {
      this.scheduleService.addCourse(course);
    }
  }
}