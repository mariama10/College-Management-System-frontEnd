import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NgForm } from '@angular/forms';
import { Courses } from '../courses';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css'],
})
export class AddCoursesComponent implements OnInit {
  minDate: String = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  courses: Courses;

  constructor(private courseService: CoursesService) {}

  public ngOnInit() {}

  addCourse(addForm: NgForm) {
    console.log(addForm.value);
    this.courseService.addCourse(addForm.value).subscribe(
      (response: Courses) => {
        alert(
          'Course ' + response.type + response.code + ' added successfully'
        );
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
