import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service:SharedService) { }
  @Output()
  myDepartment = new EventEmitter<string>();

  @Input() parseEmp:any;
  Id:string = "0";
  Name:string = "";
  Department:string = "";
  DateOfJoined:Date = new Date();
  PhotoName:string = "";
  DepartmentNames:any=[];
  PhotoFullPath:string="";
  file:any = null; // Variable to store file 
  ngOnInit(): void {
    this.bindingData();
  }

  bindingData()
  {
    this.service.getAllDepartmentName().subscribe(c =>{
      this.DepartmentNames = c;
    })    
    this.Id = this.parseEmp.Id;
    this.Name = this.parseEmp.Name;
    this.Department = this.parseEmp.Department;
    this.DateOfJoined = this.parseEmp.DateOfJoined;
    this.PhotoName = this.parseEmp.PhotoName;
    this.PhotoFullPath = this.service.imageUrl + this.PhotoName;
    this.myDepartment.emit(this.Department);
  }

  updateEmployee()
  {
    var value = {
      Id : this.Id,
      Name : this.Name,
      Department : this.Department,
      DateOfJoined : formatDate(this.DateOfJoined, 'yyyy-MM-dd', 'en-US'),
      PhotoName : this.PhotoName
    }
    this.service.updateEmployee(value).subscribe(c =>{   
      this.myDepartment.emit(this.Department);
      alert(c);
    });
  }

  addEmployee()
  {
    var value = {
      Id : this.Id,
      Name : this.Name,
      Department : this.Department,
      DateOfJoined : formatDate(this.DateOfJoined, 'yyyy-MM-dd', 'en-US'),
      PhotoName : this.PhotoName
    }
    this.service.addEmployee(value).subscribe(c =>{      
      this.myDepartment.emit(this.Department);
      alert(c);
    });
  }

  // On file Select 
  onChange(event:any) { 
    this.file = event.target.files[0]; 
    const formdata:FormData = new FormData();
    formdata.append('uploadFile', this.file , this.file .name); 
    this.service.uploadProfilePicture(formdata).subscribe((c:any) =>{
        this.PhotoName = this.file .name;
        this.PhotoFullPath = this.service.imageUrl + this.PhotoName;
    });
  } 
}
