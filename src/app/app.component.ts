import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tabChange(this.id);
  }

  //open-close side navbar
  myFunc() {
    let sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('close');
  }

  routeFunction(name: string) {
    this.router.navigate([name]);
  }

  id: any;
  tabChange(ids: any) {
    this.id = ids;
  }
}
