import { Component, OnInit } from '@angular/core';
import { Students } from '../students';
import { StudentsService } from '../students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'DataTables.net';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  totalStudents: number;
  inactiveStudents: number;
  activeStudents: number;
  searchId: number;
  input: string;

  allStudents: Students[] = [];
  studentStatus: Students[] = [];

  //import student service and routers
  constructor(
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getStudents('All');
  }

  //DISPLAY STUDENTS
  public getStudents(status: string): void {
    //since this is observable, its gonna make request over the network so its gonna take time thats
    //so we subscribe to be notified whenever data comes from server
    this.studentService.getAllStudents().subscribe(
      (response: Students[]) => {
        this.inactiveStudents = 0;
        this.activeStudents = 0;
        this.allStudents = response;
        this.totalStudents = this.allStudents.length;
        this.allStudents.forEach((row) => {
          //count active-inactive students
          if (row.inactive) {
            this.inactiveStudents = this.inactiveStudents + 1;
          } else {
            this.activeStudents = this.activeStudents + 1;
          }
          //display students according to active/inactive students
          if (row.inactive.toString() == status) {
            this.studentStatus.push(row);
            this.allStudents = this.studentStatus;
          }
        });
        this.studentStatus = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  //SEARCH STUDENTS
  onNameKeyUp(event: any) {
    this.input = event.target.value;
    this.searchId = parseInt(event.target.value);
    //if search bar is empty, display all students list
    if (this.input == '') {
      this.getStudents('All');
      return;
    }
    //if input is name then send high number to api for student id
    else if (parseInt(this.input).toString() == 'NaN') {
      this.searchId = 2000;
    } else {
      this.searchId = parseInt(this.input);
    }
    this.studentService
      .getStudentByIdOrName(this.searchId, this.input)
      .subscribe(
        (response: Students[]) => {
          this.allStudents = response;
        },
        (error: HttpErrorResponse) => {
          console.log('Not found');
          this.allStudents = [];
          return;
        }
      );
  }

  // Route student to view or update component
  routeStudent(componentName: any, sid: number) {
    this.router.navigate([componentName, sid]);
  }
  //DELETE STUDENTS
  deleteStudent(sid: number): void {
    this.studentService.deleteStudent(sid).subscribe(
      (response: void) => {
        this.getStudents('All');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
