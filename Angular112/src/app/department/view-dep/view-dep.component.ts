import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-view-dep',
  templateUrl: './view-dep.component.html',
  styleUrls: ['./view-dep.component.css']
})
export class ViewDepComponent implements OnInit {

  constructor(private shared : SharedService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  DepartmentList:any = [];
  ActivateAddEditDepComponent:boolean=false;
  MetaTitle:string="";
  dep:any;
  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentWithoutFilter:any=[];

  getDepartments()
  {
    this.shared.getAllDepartment().subscribe(data => {
      this.DepartmentList = data;
      this.DepartmentWithoutFilter = data;
    });
  }

  filterDepartment()
  {
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;
    this.DepartmentList = this.DepartmentWithoutFilter.filter(function(el:any){
      return el.Id.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().toLowerCase().trim()
      )
      &&
      el.Name.toLowerCase().includes(
        DepartmentNameFilter.toString().toLowerCase().trim()
      )
    });
  }

  Sort(prop:any, asc:boolean)
  {
    this.DepartmentList = this.DepartmentWithoutFilter.sort(function(a:any, b:any){
      if(asc)
      {
        return a[prop] > b[prop] ? 1 : ((b[prop] > a[prop]) ? -1 : 0);
      }
      else
      {
        return b[prop] > a[prop] ? 1 : ((a[prop] > b[prop]) ? -1 : 0);
      }
    });
  }

  addClick(){
    this.dep={
      Id:0,
      Name:""
    }
    this.MetaTitle = "Add Department";
    this.ActivateAddEditDepComponent = true;
  }

  editClick(item:any)
  {
    this.dep = item;
    this.MetaTitle = "Update Department";
    this.ActivateAddEditDepComponent = true;
  }

  deleteClick(item:any)
  {
    if(confirm("Are you sure?"))
    {
      this.shared.deleteDepartment(item.Id).subscribe(data =>{
        alert(data);
      });
      this.getDepartments();
    }
  }

  closeClick()
  {    
    this.ActivateAddEditDepComponent = false;
    this.getDepartments();
  }
}
