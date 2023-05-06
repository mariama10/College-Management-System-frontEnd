import { Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { CoursesService } from '../courses.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'DataTables.net';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  totalCourses: number = 0;
  inactiveCourses: number = 0;
  activeCourses: number = 0;
  allCourses: Courses[];
  courseStatus: Courses[];
  input: string;

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCourses('All');
  }

  //Get All Courses
  public getCourses(status: string): void {
    this.courseService.getAllCourses().subscribe(
      (response: Courses[]) => {
        this.inactiveCourses = 0;
        this.activeCourses = 0;
        this.allCourses = response;
        this.totalCourses = this.allCourses.length;
        this.allCourses.forEach((row) => {
          if (row.inactive) {
            this.inactiveCourses = this.inactiveCourses + 1;
          } else {
            this.activeCourses = this.activeCourses + 1;
          }
          if (row.inactive.toString() == status) {
            this.courseStatus.push(row);
            this.allCourses = this.courseStatus;
          }
        });
        this.courseStatus = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  //DELETE COURSES
  deleteCourse(cid: number): void {
    this.courseService.deleteCourse(cid).subscribe(
      (response: void) => {
        this.inactiveCourses = this.inactiveCourses + 1;
        this.activeCourses = this.activeCourses - 1;
        this.getCourses('All');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Route to Update Course
  manageCourse(cid: number) {
    console.log('Manage');
    this.router.navigate(['manageCourses/', cid]);
  }

  //SEARCH COURSES
  onNameKeyUp(event: any) {
    this.input = event.target.value;
    if (this.input == '') {
      this.getCourses('All');
      return;
    }
    this.courseService.getCoursesByCodeOrName(this.input).subscribe(
      (response: Courses[]) => {
        this.allCourses = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Not found');
        this.allCourses = [];
        return;
      }
    );
  }
}
