import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchSelectorComponent } from './branch.component';
import { TeachersComponent } from './teachers/teachers.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap';
import { StudentsComponent } from './students/students.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot()
  ],
  declarations: [BranchSelectorComponent, TeachersComponent, ProductsComponent, StudentsComponent],
    providers: [],

})
export class BranchSelectorModule { }
