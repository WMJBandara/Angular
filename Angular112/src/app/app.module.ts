import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ViewEmpComponent } from './employee/view-emp/view-emp.component';
import { AddEditEmpComponent } from './employee/add-edit-emp/add-edit-emp.component';
import { DepartmentComponent } from './department/department.component';
import { ViewDepComponent } from './department/view-dep/view-dep.component';
import { AddEditDepComponent } from './department/add-edit-dep/add-edit-dep.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    ViewEmpComponent,
    AddEditEmpComponent,
    DepartmentComponent,
    ViewDepComponent,
    AddEditDepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
