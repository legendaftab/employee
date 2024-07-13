
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employeee.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  //create object
  newEmployee = { name: '', role: '', startDate: '', endDate: '' };
  employees: any[] = [];
  formSubmitted = false;

  message = '';
  activeButton: string = '';

  // Date picker variables
  activeDateField: 'startDate' | 'endDate' = 'startDate';
  isCalendarOpen = false;
  selectedDate: Date | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit(): void { }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

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

  cancel(): void {
    this.resetForm();
    this.formSubmitted = false;
    this.message = '';
  }

  openCalendar(field: 'startDate' | 'endDate') {
    this.activeDateField = field;
    this.isCalendarOpen = true;
  }

  closeCalendar() {
    this.isCalendarOpen = false;
    this.activeButton = '';
  }
  
  onDateSelected(event: Date) {
    const formattedDate = format(event, 'dd-MM-yyyy');
    if (this.activeDateField === 'startDate') {
      this.newEmployee.startDate = formattedDate;
    } else {
      this.newEmployee.endDate = formattedDate;
    }
    this.selectedDate = event;
    this.closeCalendar();
  }

  setToday() {
    const today = new Date();
    this.setDate(today, 'today');
  }

  setNextMonday() {
    const today = new Date();
    const nextMonday = new Date(today.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7)));
    this.setDate(nextMonday, 'nextMonday');
  }

  setNextTuesday() {
    const today = new Date();
    const nextTuesday = new Date(today.setDate(today.getDate() + ((2 + 7 - today.getDay()) % 7 || 7)));
    this.setDate(nextTuesday, 'nextTuesday');
  }

  setAfterOneWeek() {
    const today = new Date();
    const nextWeek = new Date(today.setDate(today.getDate() + 7));
    this.setDate(nextWeek, 'afterOneWeek');
  }

  setDate(date: Date, button: string) {
    const formattedDate = format(date, 'dd-MM-yyyy');
    if (this.activeDateField === 'startDate') {
      this.newEmployee.startDate = formattedDate;
    } else {
      this.newEmployee.endDate = formattedDate;
    }
    this.selectedDate = date;
    this.activeButton = button;
    this.isCalendarOpen = false;
    this.adjustDates();
  }

  adjustDates() {
    if (this.newEmployee.startDate && this.newEmployee.endDate) {
      const startDate = new Date(this.newEmployee.startDate.split('-').reverse().join('-'));
      const endDate = new Date(this.newEmployee.endDate.split('-').reverse().join('-'));

      if (startDate > endDate) {
        if (this.activeDateField === 'startDate') {
          this.newEmployee.endDate = this.newEmployee.startDate;
        } else {
          this.newEmployee.startDate = this.newEmployee.endDate;
        }
      }
    }
  }
}


