import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.goToListView();
  }

  goToListView(): void {
    this.router.navigate(['/listview']);
  }

  goToCreateForm(): void {
    this.router.navigate(['/updateandcreateview', "_"])
  }

  title = 'clientappswebhf.client';
}
