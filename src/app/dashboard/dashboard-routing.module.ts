import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import { BranchSelectorComponent } from './branch/branch.component';
import { TeachersComponent } from './branch/teachers/teachers.component';
import { ProductsComponent } from './branch/products/products.component'; 
import { StudentsComponent } from './branch/students/students.component'; 
import { JobsComponent } from './jobs/jobs.component';
import {ReportComponent} from './report/report.component';


const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent,data: {"title": "Dashboard"},
    children:[
    	{path: '', redirectTo: 'branch', pathMatch: 'full'},

	    {path: 'branch', component: BranchSelectorComponent, data: {breadcrumb: 'Branch'}},
	    {path: 'branch/:id/get-teachers', component: TeachersComponent, data: {breadcrumb: 'Branch / Teachers'}},
	    {path: 'branch/:id/get-products', component: ProductsComponent, data: {breadcrumb: 'Branch / Products'}},
    	{path: 'branch/:id/get-students', component: StudentsComponent, data: {breadcrumb: 'Branch / Stduents'}},
    	{path: 'jobs/:branchId', component: JobsComponent,data: {breadcrumb: 'jobs'}},
        {path: 'report', component: ReportComponent,data: {
          "title": "Reports",
          breadcrumb: "reports"
        }
        
    }
    ]},

    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule {
}
