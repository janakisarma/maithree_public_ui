import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from  '../../../services/app-services';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private service: AppService,private router: Router,
    private formBuilder: FormBuilder) { }

  private branchId: string;
  private teachersList=[];
  // private selectedTeacher ="-1";
  private selectedStudent;
  private selectedProduct;
  
  form: FormGroup;
  private studentsData={};

  ngOnInit() {
    console.log(this.selectedStudent);
  	this.activeRoute.params.subscribe(params => {
  			this.branchId = params['id'];
  			this.getTeachersList(this.branchId);
      });
      
      this.form = this.formBuilder.group({
        teacher: [null, Validators.required],
      });

      this.studentsData = {
        "students": 
            [
              {
                "name": "Student1",
                "id": "100",
                "products": 
                    [
                        {
                        "id": "1",
                        "name": "Product1",
                        "tasks": 
                            [
                                {
                                "id": "1",
                                "name": "task1",
                                "description": "description",
                                "target": 0,
                                "completed": 0,
                                "assigned": false
                                },
                                {
                                "id": "3",
                                "name": "task2",
                                "description": "description",
                                "target": 0,
                                "completed": 0,
                                "assigned": false
                                }
                            ]
                        },
                        {
                        "id": "id",
                        "name": "product2",
                        "tasks": 
                            [
                                {
                                "id": "4",
                                "name": "task1",
                                "description": "description",
                                "target": 0,
                                "completed": 0,
                                "assigned": false
                                },
                                {
                                "id": "5",
                                "name": "task2",
                                "description": "description",
                                "target": 0,
                                "completed": 0,
                                "assigned": false
                                }
                            ]
                        }
                    ]
                },
                {
                  "name": "student2",
                  "id": "200",
                  "products": 
                      [
                          {
                          "id": "3",
                          "name": "product3",
                          "tasks": 
                              [
                                  {
                                  "id": "1",
                                  "name": "task1",
                                  "description": "description",
                                  "target": 0,
                                  "completed": 0,
                                  "assigned": false
                                  },
                                  {
                                  "id": "2",
                                  "name": "task2",
                                  "description": "description",
                                  "target": 0,
                                  "completed": 0,
                                  "assigned": false
                                  }
                              ]
                          },
                          {
                          "id": "4",
                          "name": "product4",
                          "tasks": 
                              [
                                  {
                                  "id": "5",
                                  "name": "task5",
                                  "description": "description",
                                  "target": 0,
                                  "completed": 0,
                                  "assigned": false
                                  },
                                  {
                                  "id": "6",
                                  "name": "task6",
                                  "description": "description",
                                  "target": 0,
                                  "completed": 0,
                                  "assigned": false
                                  }
                              ]
                          }
                      ]
                  }
            ]
        };
      }


  	getTeachersList(id: string) {
  		this.service.getTeachersList(id).subscribe((teachersList:any)=> {
  			this.teachersList = teachersList;
  		})
  	}

    // saveTecherInfo() {
    //     this.service.setDataInBrowser(this.selectedTeacher,'selectedTeacher');
    //     this.service.setDataInBrowser(this.branchId,'selectedBranch');
    //     this.router.navigateByUrl('/dashboard/branch/students')
    // }

    
    getProducts(studentId){
      this.selectedProduct=null;
      this.selectedStudent=studentId;
    }

    getTasks(taskId){
      this.selectedProduct=null;
      this.selectedProduct=taskId;
    }
    submitSave(){
      console.log(this.selectedStudent);
      console.log(this.selectedProduct);
      
      var reqBody={
        "branchid": this.branchId,
        "studentid": this.studentsData['students'][this.selectedStudent].id,
        "productid": this.studentsData['students'][this.selectedStudent].products[this.selectedProduct].id,
        "tasks": [
        ]
      }
      this.studentsData['students'][this.selectedStudent].products[this.selectedProduct]['tasks'].forEach(task => {
        if(task.assigned)
        reqBody['tasks'].push(
          {
            "id": task.id,
            "name": task.name,
            "assigned": task.assigned,
            "target": task.target,
            "completed": task.completed
          }
        );
      });
      console.log(reqBody);
    }
    cancel(){
      this.selectedStudent=null;
      this.selectedProduct=null;
    }

}
