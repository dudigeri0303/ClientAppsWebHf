import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideogameComponent } from './videogame/videogame.component';
import { VideogamelistviewComponent } from './videogamelistview/videogamelistview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListviewComponent } from './listview/listview.component';
import { DetailedviewComponent } from './detailedview/detailedview.component';
import { VideogamecarviewComponent } from './videogamecarview/videogamecarview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateandcreateformComponent } from './updateandcreateform/updateandcreateform.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    VideogameComponent,
    VideogamelistviewComponent,
    ListviewComponent,
    DetailedviewComponent,
    VideogamecarviewComponent,
    UpdateandcreateformComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
