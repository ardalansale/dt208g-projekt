import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalCourses: number = 0;
  totalSubjects: number = 0;
  scheduleCount: number = 0;
  totalPoints: number = 0;

  constructor(
    private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.totalCourses = courses.length;
      this.totalSubjects = new Set(courses.map(c => c.subject)).size;
    });

    this.scheduleService.schedule$.subscribe(schedule => {
      this.scheduleCount = schedule.length;
      this.totalPoints = this.scheduleService.getTotalPoints();
    });
  }
}