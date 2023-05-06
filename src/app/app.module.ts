import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsService } from './students.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddCoursesComponent } from './coursesService/add-courses/add-courses.component';
import { ManageCoursesComponent } from './coursesService/manage-courses/manage-courses.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './coursesService/courses-list/courses-list.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    AddCoursesComponent,
    ManageCoursesComponent,
    StudentsListComponent,
    UpdateStudentComponent,
    ViewStudentComponent,
    CoursesListComponent,
    DashbaordComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [StudentsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
