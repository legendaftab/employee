import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private dbService: NgxIndexedDBService,
    // private http:HttpClient
  ) { }

  addEmployee(employee: { name: string, role: string, startDate: string, endDate: string }): Observable<number> {
    return this.dbService.add('employees', employee).pipe(
      map((addedEmployee) => addedEmployee.id)
    );
  }
  
  getEmployee(id: number): Observable<any> {
    return this.dbService.getByKey('employees', id);
  }

  getAllEmployees(): Observable<any[]> {
    return this.dbService.getAll('employees');
  }

  updateEmployee(id: number, update: { name?: string, role?: string, startDate?: string, endDate?: string }): Observable<any> {
    return this.dbService.update('employees', { id, ...update });
  }

  deleteEmployee(id: number): Observable<any> {
    return this.dbService.delete('employees', id);
  }
}
