import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeaveFormComponent } from './Components/leave-form/leave-form.component';
import { LeaveListComponent } from './Components/leave-list/leave-list.component';
import { LeaveDetailComponent } from './Components/leave-detail/leave-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { NgConfirmModule } from 'ng-confirm-box';
import { LeaveEditComponent } from './Components/leave-edit/leave-edit.component';
import { HomeComponent } from './Components/home/home.component';
import { StatusComponent } from './Components/status/status.component';


@NgModule({
  declarations: [
    AppComponent,
    LeaveFormComponent,
    LeaveListComponent,
    LeaveDetailComponent,
    LeaveEditComponent,
    HomeComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgConfirmModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
