import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {AppService} from '../../services/app-services'
import {ReportService} from '../../services/report/report.service'
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-target-configuration',
  templateUrl: './target-configuration.component.html',
  styleUrls: ['./target-configuration.component.css']
})
export class TargetConfigurationComponent implements OnInit {

  constructor(private service: AppService, private reportService : ReportService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  branches=[];
  selectedBranch="";
  productList = [];
  dataList:any;
  monthList=[];
  selectedMonth = ""

  ngOnInit() {
    this.getListOfBranches();
    this.getMonth();
    this.setCurrentMonthOnStartUp();
   // this.getListOfProducts(null);
  }

  setCurrentMonthOnStartUp() {
    let d = new Date();
    let m = this.monthList[d.getMonth()];
    this.selectedMonth = m.value;
    this.getListOfProducts(m.value)
  }

  getMonth(){
    this.monthList = this.reportService.monthNames;
  }

  getListOfBranches() {
    this.service.getBranches().subscribe((branches : any) => {
      this.branches = branches;
    })
  }

  getListOfProducts(d) {
    var date = moment(new Date()).startOf('year').add(d, 'months').format("YYYY-MM-DD HH:mm:ss")
    if(!d) {
      date = moment(new Date()).startOf('month').format("YYYY-MM-DD HH:mm:ss")
    }
    
    this.service.getProductList(date).subscribe((products : any) => {
      for(let i in products){
        products[i].data = new Array(this.branches.length);
      }
      this.productList = products;
    })
  }


  getProductsAgainstBranch(id: string) {
    this.service.getProductListForBranch(id).subscribe((products: any) => {
      this.productList = products;
    });
  }

  updateTarget() {
    const date = moment(new Date()).startOf('year').add(this.selectedMonth, 'months').format('YYYY-MM-DD HH:mm:ss');
    let targetData = [];
    for (const p of this.productList) {
      targetData.push(...p.targetData);
    }

    targetData = targetData.filter((data, i) => {
      return data.bp_id !== '' ;
    });

    this.service.createOrUpdateTargets(date, targetData).subscribe((result: any) => {
       this.toastr.success('Target set successfully', 'Success !');
    });
  }

}
