import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from  '../../../services/app-services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private service: AppService,private router: Router,
    private formBuilder: FormBuilder) { }

  private branchId: string;
  private teachersList=[];
  private selectedTeacher ="-1";
  form: FormGroup;


  ngOnInit() {
  	this.activeRoute.params.subscribe(params => {
  			this.branchId = params['id'];
  			this.getTeachersList(this.branchId);
  		});

      this.form = this.formBuilder.group({
        teacher: [null, Validators.required],
      });
  	}


  	getTeachersList(id: string) {
  		this.service.getTeachersList(id).subscribe((teachersList:any)=> {
  			this.teachersList = teachersList;
  		})
  	}

    saveTecherInfo() {
        this.service.setDataInBrowser(this.selectedTeacher,'selectedTeacher');
        this.service.setDataInBrowser(this.branchId,'selectedBranch');
        this.router.navigateByUrl('/dashboard/branch/'+this.branchId+'/get-students')
    }

}
