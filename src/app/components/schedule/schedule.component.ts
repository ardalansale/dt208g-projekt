import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  schedule: Course[] = [];
  totalPoints: number = 0;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.schedule$.subscribe(data => {
      this.schedule = data;
      this.totalPoints = this.scheduleService.getTotalPoints();
    });
  }

  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
  }
}