import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employeee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  currentEmployees: any[] = [];
  previousEmployees: any[] = [];
  deleteMessage = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
  }
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.currentEmployees = this.employees.filter(emp => !emp.endDate);
      this.previousEmployees = this.employees.filter(emp => emp.endDate);
    });
  }
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.deleteMessage = 'Employee data has been  deleted';
      this.loadEmployees();
      setTimeout(() => {
        this.deleteMessage = '';
      }, 2000);
    }, error => {
      console.error(error);
    });
  }
  openEmployeeForm(): void {
    this.router.navigate(['/add']);
  }
}


