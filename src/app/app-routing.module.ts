import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCoursesComponent } from './coursesService/add-courses/add-courses.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AppComponent } from './app.component';
import { ManageCoursesComponent } from './coursesService/manage-courses/manage-courses.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { CoursesListComponent } from './coursesService/courses-list/courses-list.component';
import { CommonModule } from '@angular/common';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'cms', component: WelcomeComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'addStudent', component: AddStudentComponent },
  { path: 'studentsList', component: StudentsListComponent },
  { path: 'viewStudent/:sid', component: ViewStudentComponent },
  { path: 'updateStudent/:sid', component: UpdateStudentComponent },
  { path: 'updateStudent', component: UpdateStudentComponent },
  { path: 'addCourses', component: AddCoursesComponent },
  { path: 'coursesList', component: CoursesListComponent },
  { path: 'manageCourses', component: ManageCoursesComponent },
  { path: 'manageCourses/:cid', component: ManageCoursesComponent },
  { path: '', redirectTo: 'cms', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule, CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
