import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveFormComponent } from './Components/leave-form/leave-form.component';
import { LeaveListComponent } from './Components/leave-list/leave-list.component';
import { LeaveDetailComponent } from './Components/leave-detail/leave-detail.component';
import { LeaveEditComponent } from './Components/leave-edit/leave-edit.component';
import { HomeComponent } from './Components/home/home.component';
import { StatusComponent } from './Components/status/status.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'status/:name', component:StatusComponent},
  {path:'leaveForm/:name', component:LeaveFormComponent},
  {path:'leaveList/:name', component:LeaveListComponent},
  {path:'leaveDetail/:id', component:LeaveDetailComponent},
  {path:'leaveEdit/:name/:id', component:LeaveFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
