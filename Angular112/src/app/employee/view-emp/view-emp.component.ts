import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-view-emp',
  templateUrl: './view-emp.component.html',
  styleUrls: ['./view-emp.component.css']
})
export class ViewEmpComponent implements OnInit {

  constructor(private service: SharedService) { }
  Name:string = "";
  //@Input() addItem:string;
  ngOnInit(): void {
    this.getEmployeeList();
    //this.Name = this.addItem;
  }
  EmployeeList: any = [];
  MetaTitle: string = "";
  ActivateAddEditEmpComponent: boolean = false;
  employee: any;


  getEmployeeList() {
    this.service.getEmployee().subscribe(data => {
      this.EmployeeList = data;
    });
  }

  addClick() {
    this.MetaTitle = "Add Employee";
    this.ActivateAddEditEmpComponent = true;
    this.employee = {
      Id: 0,
      Name: "",
      Department: "",
      DateOfJoined: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      PhotoName: ""
    }
  }

  editClick(item: any) {
    this.MetaTitle = "Update Employee";
    this.ActivateAddEditEmpComponent = true;
    this.employee = {
      Id: item.Id,
      Name: item.Name,
      Department: item.Department,
      DateOfJoined: formatDate(item.DateOfJoined, 'yyyy-MM-dd', 'en-US'),
      PhotoName: item.PhotoName,
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComponent = false;
    this.getEmployeeList();
  }

  deleteClick(item: any) {
    if (confirm("Do you want to delete?")) {
      this.service.deleteEmployee(item.Id).subscribe(c => {
        alert(c);
      });
    }
    this.getEmployeeList();
  }
}
