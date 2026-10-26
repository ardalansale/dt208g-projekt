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

  // Paginering-variabler
  currentPage: number = 1;
  itemsPerPage: number = 10; // Visar 10 kurser per sida

  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filteredCourses = data;
      this.subjects = [...new Set(data.map(c => c.subject))];
    });

    this.scheduleService.schedule$.subscribe(scheduleData => {
      this.schedule = scheduleData;
    });
  }

  // Hämta endast de kurser som ska visas på aktuell sida
  get paginatedCourses(): Course[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Beräkna totala antalet sidor
  get totalPages(): number {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage) || 1;
  }

  // Bläddra framåt
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Bläddra bakåt
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  filterCourses(): void {
    let result = this.courses;

    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(course => 
        course.courseName.toLowerCase().includes(term) ||
        course.courseCode.toLowerCase().includes(term)
      );
    }

    if (this.selectedSubject) {
      result = result.filter(course => course.subject === this.selectedSubject);
    }

    if (this.sortField) {
      result = [...result];
      if (this.sortField === 'code') {
        result.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
      } else if (this.sortField === 'name') {
        result.sort((a, b) => a.courseName.localeCompare(b.courseName)); // Fixat till courseName här!
      } else if (this.sortField === 'points') {
        result.sort((a, b) => b.points - a.points);
      }
    }

    this.filteredCourses = result;
    this.currentPage = 1; // Återställ alltid till sida 1 vid ny sökning/filtrering
  }

  sortCourses(): void {
    this.filterCourses();
  }

  isCourseInSchedule(courseCode: string): boolean {
    return this.schedule.some(c => c.courseCode === courseCode);
  }

  toggleCourse(course: Course): void {
    if (this.isCourseInSchedule(course.courseCode)) {
      this.scheduleService.removeCourse(course.courseCode);
    } else {
      this.scheduleService.addCourse(course);
    }
  }
}