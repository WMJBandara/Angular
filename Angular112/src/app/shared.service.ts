import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly ApiUrl = 'http://localhost:55406/api';
  readonly imageUrl = 'http://localhost:55406/Images/'
  readonly ImageName = "anonymous.png";
  constructor(private http:HttpClient) { }

  getAllDepartment():Observable<any[]>
  {
    return this.http.get<any[]>(this.ApiUrl + '/department');
  }

  addDepartment(val:any)
  {
    return this.http.post(this.ApiUrl + '/department', val);
  }

  updateDepartment(val:any)
  {
    return this.http.put(this.ApiUrl + '/department', val);
  }

  deleteDepartment(id:any)
  {
    console.log(this.ApiUrl + '/department/'+ id);
    return this.http.delete(this.ApiUrl + '/department/'+ id);
  }

  getEmployee():Observable<any[]>
  {
      return this.http.get<any[]>(this.ApiUrl + '/employee');
  }  
  
  addEmployee(val:any)
  {
    return this.http.post(this.ApiUrl + '/employee', val);
  }

  updateEmployee(val:any)
  {
    return this.http.put(this.ApiUrl + '/employee', val);
  }

  deleteEmployee(id:any)
  {
    return this.http.delete(this.ApiUrl + '/employee/'+id);    
  }

  uploadProfilePicture(val:any)
  {
    return this.http.post(this.ApiUrl + '/employee/savefile', val);
  }

  getAllDepartmentName():Observable<any[]>
  {
    return this.http.get<any[]>(this.ApiUrl + '/department/getalldepartmentnames');
  }
}
