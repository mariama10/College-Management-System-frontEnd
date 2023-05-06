import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CoursesService } from '../courses.service';
import { Courses } from '../courses';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css'],
})
export class ManageCoursesComponent implements OnInit {
  cid: number;
  course: Courses = new Courses();
  minDate: String = new Date().toLocaleDateString('fr-ca');
  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.cid = this.route.snapshot.params['cid'];
    this.courseService.getCourseById(this.cid).subscribe(
      (response) => {
        this.course = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmit(course: Courses) {
    this.courseService.updateCourse(this.course).subscribe(
      (response: Courses) => {
        this.router.navigate(['coursesList']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
