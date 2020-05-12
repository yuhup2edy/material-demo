import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; //view child is for table sorting 
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'; 
import { Observable} from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface rarData {
  
  rarData_TicketId      : number;
  rarData_RequesterId   : string;
  rarData_Application   : string;
  rarData_Role          : string;
  rarData_Approver      : string;
  rarData_NeedBy        : string;
  rarData_UserList      : string;
  rarData_Status        : string;
  }

const ELEMENT_DATA: rarData[] = [
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1001, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'ICD', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Abhijit Mukherjee', 
    rarData_NeedBy : '05/19/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Pending'
   },
   { 
    rarData_TicketId : 1008, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'CORE', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '06/01/2020',
    rarData_UserList : 'Vithya and Kumar JD', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1109, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'TitleSnap', 
    rarData_Role: 'Administrator',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '04/19/2020',
    rarData_UserList : 'Bala, Venkat and ', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
   { 
    rarData_TicketId : 1000, 
    rarData_RequesterId: 'venktS', 
    rarData_Application: 'KLO', 
    rarData_Role: 'Contributor',
    rarData_Approver : 'Maryanne Frake', 
    rarData_NeedBy : '05/15/2020',
    rarData_UserList : 'KumarPav,VenkatSx', 
    rarData_Status : 'Completed'
   },
 ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit
{

  currDate = new Date();
  minDate  = new Date();
  skipDay : number;
  dateEvents: string[] = [];
  
  
  ngOnInit()
  {
    //minDate returns today + 3 days as default selector for need by ; adjust for sat  & sun
    
    this.minDate = new Date(this.currDate.getTime() + 3 * (1000 * 60 * 60 * 24));
    this.skipDay = this.minDate.getDay();
    
    if (this.skipDay === 0)
    {
      this.minDate = new Date(this.currDate.getTime() + 4 * (1000 * 60 * 60 * 24));
    }
    else if (this.skipDay === 6)
    {
      this.minDate = new Date(this.currDate.getTime() + 5 * (1000 * 60 * 60 * 24));
    } 

  }

  ngAfterViewInit()
  {

  }

  //dateFilter function on the need by date filters out the weekends
  dateFilter = date => 
  {
    const day = date.getDay();
    return day !=0 && day != 6;
  }
  // all form definitions & validations begin here
  
  rarRequesterId = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^[a-zA-Z]+$')
  ]);

  rarApplication = new FormControl('', [
    Validators.required,
  ]);
  
  rarRole = new FormControl('', [
    Validators.required,
  ]);
  
  rarApprover = new FormControl('', [
    Validators.required,
  ]);

  rarNeedByDate = new FormControl('', [
    Validators.required,
  ]);

  rarUsersList = new FormControl('', [
    Validators.required,
  ]);

  // calling the global validator
  
  validator = new MyErrorStateMatcher();
  
 // all form definitions & validations end here

 processRARSubmission()
 {
   console.log(this.rarApprover.value);
 }

} // close of the AppComponent Class

