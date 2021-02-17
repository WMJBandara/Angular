import { Component, Input, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service'

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {
  @Input() dep:any;
  Name:string="";
  Id:string="0";
  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.Name = this.dep.Name;
    this.Id = this.dep.Id;
  }

  addDepartment()
  {
    var value = {Id : this.Id, Name : this.Name};
    this.service.addDepartment(value).subscribe(res =>
      {
        alert(res);
      }); 
  }

  updateDepartment()
  {
    var value = {Id : this.Id, Name : this.Name};
    this.service.updateDepartment(value).subscribe(res =>
    {
      alert(res);
    });
  }
}
