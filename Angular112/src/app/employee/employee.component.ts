import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor() { }
  department:string = "";
  ngOnInit(): void {

  }
  addItem(newItem: string)
  {
    this.department = newItem;
  }
}
