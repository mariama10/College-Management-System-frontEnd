import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Students } from '../students';
import { StudentsService } from '../students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {
  sid: number;
  student: Students = new Students();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.sid = this.route.snapshot.params['sid'];
    this.studentService.getStudentById(this.sid).subscribe(
      (response) => {
        this.student = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //send new student's info on save changes
  onSubmit(student: Students) {
    this.studentService.updateStudents(this.student).subscribe(
      (response: Students) => {
        alert('Student update Successfully');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //Route to View Student
  viewStudent() {
    this.router.navigate(['viewStudent', this.sid]);
  }
}
