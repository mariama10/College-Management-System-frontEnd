import { Component, OnInit } from '@angular/core';
import { Students } from '../students';
import { StudentsService } from '../students.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  students: Students;
  maxDate: String = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private studentService: StudentsService) {}

  addStudent(addForm: NgForm) {
    this.studentService.addStudents(addForm.value).subscribe(
      (response: Students) => {
        alert(
          response.fname +
            response.lname +
            ' with ID = ' +
            response.sid +
            ' has been added successfully!'
        );
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
