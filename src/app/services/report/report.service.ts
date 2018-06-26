import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { HttpClient } from '@angular/common/http';
@Injectable()
export class ReportService {
  //private REPORT_BASE_URL = "http://localhost:5555/api/v1/reports";
  //private IMAGE_BASE_URL = "http://localhost:5555"
  // private REPORT_BASE_URL = "http://10.176.16.106:5555/api/v1/reports";
  // private IMAGE_BASE_URL = "http://10.176.16.106:5555"

  private REPORT_BASE_URL = "/server/api/v1/reports";
  private IMAGE_BASE_URL = "/server"

  constructor(private http: HttpClient) { }

  getAllInventoryReport(){
    return this.http.get(this.REPORT_BASE_URL+"/inventories/").map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }

  getAllInventoryReportByDate(fromDate: any, toDate: any){
    let filterDateURL = this.getFilterDateURL(fromDate, toDate);
    return this.http.get(this.REPORT_BASE_URL+"/inventories"+filterDateURL).map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }

  getFilterDateURL(fromDate: any, toDate: any) {
    if(this.isEmpty(fromDate) && this.isEmpty(toDate)){
      return "";
    }
    if(!this.isEmpty(fromDate) && this.isEmpty(toDate)) {
      let startDate = fromDate.year+"-"+fromDate.month +"-" + fromDate.day;
      return "?startDate="+startDate;
    }
    if(this.isEmpty(fromDate) && !this.isEmpty(toDate)) {
      let endDate = toDate.year+"-"+toDate.month +"-" + toDate.day;
      return "?endDate="+endDate;
    }
    if(!this.isEmpty(fromDate) && !this.isEmpty(toDate)) {
      let startDate = fromDate.year+"-"+fromDate.month +"-" + fromDate.day;
      let endDate = toDate.year+"-"+toDate.month +"-" + toDate.day;
      return "?startDate="+startDate+"&endDate="+endDate;
    }

  }

  isEmpty(date: object){
    for(var key in date) {
      if(date.hasOwnProperty(key))
          return false;
    }
    return true;
  }


  getInventoryDataBasedOnbranch() {
     return this.http.get(this.REPORT_BASE_URL+"/inventories/summary").map((res: any) => {
      let inventries = res;
      return inventries;
    });
  }


}
