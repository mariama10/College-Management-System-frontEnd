import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { CoursesService } from '../coursesService/courses.service';
import { Students } from '../students';
import { HttpErrorResponse } from '@angular/common/http';
import { Courses } from '../coursesService/courses';
import { Chart, registerables } from 'chart.js/auto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css'],
})
export class DashbaordComponent implements OnInit {
  students: Students[];
  courses: Courses[];
  totalMajors: any;
  totalDegrees: any;
  data: any[];
  labelData: any[];
  valuesData: any[];
  colorData: any[];

  constructor(
    private studentService: StudentsService,
    private courseService: CoursesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    //Graduate-Undergraduate Students
    this.colorData = ['blue', 'aqua'];
    this.getStudents('status', 'piechart', 'pie', false, false, this.colorData);
    //total students in each major
    this.colorData = [
      '#ffadad',
      '#ffd6a5',
      '#caffbf',
      '#9bf6ff',
      '#bdb2ff',
      '#grey',
    ];
    this.totalMajors = 0;
    this.getStudents('major', 'barchart', 'bar', true, true, this.colorData);
    this.colorData = ['#ff9f1c', '#ffff3f'];
    this.getStudents(
      'state',
      'dochart',
      'doughnut',
      false,
      false,
      this.colorData
    );
    // total students in each active course
    this.colorData = [
      '#f8961e',
      '#e5383b',
      '#e9ff70',
      '#ffe6a7',
      '#a4161a',
      '#2ec4b6',
      '#05668d',
      'purple',
    ];
    this.getCourses('type', 'barchart2', 'bar', true, false, this.colorData);
    //International-In country students
    this.colorData = ['#007200', '#9ef01a'];
    this.getStudents(
      'country',
      'piechart2',
      'pie',
      false,
      false,
      this.colorData
    );
    //total students in each degree
    this.colorData = [
      '#9381ff',
      '#ffcfd2',
      '#90dbf4',
      '#98f5e1',
      '#b9fbc0',
      '#cfbaf0',
      '#00a6fb',
    ];
    this.getStudents(
      'degree',
      'piechart3',
      'pie',
      false,
      false,
      this.colorData
    );
  }

  getStudents(
    rowType: any,
    chartName: any,
    chartType: any,
    xDisplay: any,
    yDisplay: any,
    colors: any[]
  ): void {
    this.studentService
      .getStudentsByStatus(false)
      .subscribe((response: Students[]) => {
        this.students = response;
        var rows = 'default';
        this.data = [];
        this.labelData = [];
        this.valuesData = [];
        this.students.forEach((row) => {
          if (rowType == 'major') {
            rows = row.major;
          } else if (rowType == 'status') {
            rows = row.status;
          } else if (rowType == 'state') {
            rows = row.state;
          } else if (rowType == 'country') {
            rows = row.country;
          } else if (rowType == 'degree') {
            rows = row.degree;
          }
          if (rows != null && rows != '') {
            //if data already exists then update with new value
            if (this.data.includes(rows)) {
              let valueIndex = this.data.lastIndexOf(rows) + 1;
              let value = Number(this.data.at(valueIndex)) + 1;
              this.data.splice(valueIndex, 1, value.toString());
            } else {
              this.data.push(rows);
              let count = 1;
              this.data.push(count.toString());
            }
          }
        });
        this.addDataIntoList(rowType);
        this.renderChart(
          chartName,
          chartType,
          this.labelData,
          this.valuesData,
          colors,
          xDisplay,
          yDisplay
        );
      });
  }
  getCourses(
    rowType: any,
    chartName: any,
    chartType: any,
    xDisplay: any,
    yDisplay: any,
    colors: any[]
  ): void {
    this.courseService
      .getCoursesByStatus(false)
      .subscribe((response: Courses[]) => {
        this.courses = response;
        var rows = 'default';
        this.data = [];
        this.labelData = [];
        this.valuesData = [];
        this.courses.forEach((row) => {
          if (row.type != null && row.type != '') {
            if (this.data.includes(row.type)) {
              let valueIndex = this.data.lastIndexOf(row.type) + 1;
              let value = Number(this.data.at(valueIndex)) + 1;
              this.data.splice(valueIndex, 1, value.toString());
            } else {
              this.data.push(row.type);
              let count = 1;
              this.data.push(count.toString());
            }
          }
        });
        this.addDataIntoList(rowType);
        this.renderChart(
          chartName,
          chartType,
          this.labelData,
          this.valuesData,
          colors,
          xDisplay,
          yDisplay
        );
      });
  }
  addDataIntoList(rowType: any): void {
    let count = 0;
    if (rowType == 'state') {
      for (let i = 0; i < this.data.length; i = i + 2) {
        if (this.data.at(i).toUpperCase() != 'NJ') {
          count = count + Number(this.data.at(i + 1));
        }
      }
      this.labelData.push('Out-of-State', 'In-State');
      this.valuesData.push(count, this.students.length - count);
    } else if (rowType == 'country') {
      for (let i = 0; i < this.data.length; i = i + 2) {
        if (this.data.at(i).toLowerCase() != 'united states') {
          count = count + Number(this.data.at(i + 1));
        }
      }
      this.labelData.push('International', 'In-Country');
      this.valuesData.push(count, this.students.length - count);
    } else {
      for (let i = 0; i < this.data.length; i = i + 1) {
        if (i % 2 == 0) {
          this.labelData.push(this.data.at(i));
        } else {
          this.valuesData.push(Number(this.data.at(i)));
        }
      }
    }
    if (rowType == 'major') {
      this.totalMajors = this.labelData.length;
    } else if (rowType == 'degree') {
      this.totalDegrees = this.labelData.length;
    }
  }
  renderChart(
    chartName: any,
    chartType: any,
    label: any[],
    value: any[],
    color: any[],
    xDisplay: boolean,
    yDisplay: boolean
  ) {
    const myChart = new Chart(chartName, {
      type: chartType,
      data: {
        labels: label,
        datasets: [
          {
            label: '# of Students',
            data: value,
            backgroundColor: color,
            borderColor: ['black'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              color: ['white'],
              font: {
                size: 13,
              },
            },
            beginAtZero: true,
            display: yDisplay,
          },
          x: {
            ticks: {
              color: ['white'],
              font: {
                size: 14,
              },
            },
            display: xDisplay,
          },
        },
      },
    });
  }
}
