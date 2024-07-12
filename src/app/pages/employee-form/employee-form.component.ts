import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employeee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {


  newEmployee = { name: '', role: '', startDate: '', endDate: '' };
  employees: any[] = [];
  formSubmitted = false;
  message = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {

  }

  ngOnInit(): void { }

  addEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.role && (this.newEmployee.startDate || this.newEmployee.endDate)) {
      this.employeeService.addEmployee(this.newEmployee).subscribe({
        next: () => {
          this.message = 'Employee details have been saved successfully! Go to Dashboard';
          setTimeout(() => {
            this.formSubmitted = true;
          }, 1000);
          this.loadEmployees();
          this.newEmployee = { name: '', role: '', startDate: '', endDate: '' };
          this.formSubmitted = true;
        },
        error: () => {
          this.message = 'An error occurred while saving the employee details. Please try again.';
          setTimeout(() => {
            this.formSubmitted = false;
          }, 1000);
        }
      });
    } else {
      this.message = "Please fill in all required fields.";
      setTimeout(() => {
        this.formSubmitted = false;
      }, 1000);
    }
  }

  resetForm(): void {
    this.newEmployee = { name: '', role: '', startDate: '', endDate: '' };
  }
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
  cancel(): void {
    this.resetForm();
    this.formSubmitted = false;
    this.message = '';
  }

}


