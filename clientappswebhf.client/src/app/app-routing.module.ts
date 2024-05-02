import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListviewComponent } from './listview/listview.component';
import { DetailedviewComponent } from './detailedview/detailedview.component';
import { UpdateandcreateformComponent } from './updateandcreateform/updateandcreateform.component';

const routes: Routes = [
  { path: 'listview', component: ListviewComponent },
  { path: 'detailedview/:id', component: DetailedviewComponent },
  { path: 'updateandcreateview/:id', component: UpdateandcreateformComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
