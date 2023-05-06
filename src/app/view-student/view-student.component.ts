import { Component, OnInit } from '@angular/core';
import { Directive, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Students } from '../students';
import { StudentsService } from '../students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentCourses } from '../StudentCourses';
import { StudentCoursesService } from '../student-courses.service';
import { Courses } from '../coursesService/courses';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  @Input() status: string;

  sid: number;
  students: Students = new Students();
  credits: number = 0;
  inProgressCredits: number = 0;
  attemptedCredits: number = 0;
  coursesList: StudentCourses[];
  courses: Courses[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService,
    private studentCoursesService: StudentCoursesService
  ) {}

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['sid'];
    this.studentService.getStudentById(this.sid).subscribe(
      (response) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.getCredits('completed');
    this.getCredits('failed');
    this.getCredits('withdrew');
    this.getCredits('in progress');
  }
  // get status such as completed, failed etc on click
  id: any = 'default';
  tabChange(ids: any) {
    this.id = ids;
  }

  //CREDITS INFO
  getCredits(status: string) {
    this.studentCoursesService.getCredits(this.sid, status).subscribe(
      (response: number) => {
        if (status == 'completed') {
          this.credits = response;
        } else if (status == 'failed' || status == 'withdrew') {
          this.attemptedCredits = response;
        } else {
          this.inProgressCredits = response;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //get COURSES of that student
  name: String;
  public getStudentCourses(): void {
    this.studentCoursesService.getStudentCourses(this.sid, this.id).subscribe(
      (response: StudentCourses[]) => {
        this.coursesList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Route to Update Student
  updateStudent() {
    this.router.navigate(['updateStudent/', this.sid]);
  }
}
