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
  
  rarData_RequestId     : number;
  rarData_RequesterId   : string;
  rarData_Application   : string;
  rarData_Role          : string;
  rarData_Approver      : string;
  rarData_NeedBy        : string;
  rarData_UserList      : string;
  rarData_Status        : string;
  }


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
  touchDisable : boolean;
  //resetDisable : boolean;
  
  // displayedColumns: string[] = ['Request Id', 'Requester Id', 'Application', 'Role', 
  //                               'Approver', 'Need By', 'Remarks', 'Status'];

  displayedColumns: string[] = ['Request Id', 'Requester Id', 'Application', 'Role', 
                                 'Approver', 'Need By', 'Status'];

  
  
    @ViewChild(MatSort, { static: true }) sort1: MatSort;  //remember to use sort in the afterview init becuase child as to be loaded
    @ViewChild(MatPaginator) paginate1 : MatPaginator; // this is to paginate the table; also position on ngAgterviewInit

    
    DISPLAY_VIEW: rarData[] = [
      { 
       rarData_RequestId      : 1000, 
       rarData_RequesterId   : 'venkatS', 
       rarData_Application   : 'KLO', 
       rarData_Role          : 'Contributor',
       rarData_Approver      : 'Maryanne', 
       rarData_NeedBy        : '05/15/2020',
       rarData_UserList      : 'KumarPav,VenkatSx', 
       rarData_Status        : 'Completed'
      },
      { 
       rarData_RequestId : 1001, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'ICD', 
       rarData_Role: 'Contributor',
       rarData_Approver : 'Abhijit', 
       rarData_NeedBy : '05/19/2020',
       rarData_UserList : 'KumarPav,VenkatSx', 
       rarData_Status : 'Pending'
      },
      { 
       rarData_RequestId : 1008, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'CORE', 
       rarData_Role: 'Contributor',
       rarData_Approver : 'Maryanne', 
       rarData_NeedBy : '06/01/2020',
       rarData_UserList : 'Vithya and Kumar JD', 
       rarData_Status : 'Completed'
      },
      { 
       rarData_RequestId : 1109, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'TitleSnap', 
       rarData_Role: 'Admin',
       rarData_Approver : 'Maryanne', 
       rarData_NeedBy : '04/19/2020',
       rarData_UserList : 'Bala, Venkat and Sushi', 
       rarData_Status : 'Completed'
      },
      { 
       rarData_RequestId : 1247, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: '$AFE', 
       rarData_Role: 'Build',
       rarData_Approver : 'Mark', 
       rarData_NeedBy : '02/01/2020',
       rarData_UserList : 'KumarPav,VenkatSx', 
       rarData_Status : 'Pending Clarification'
      },
      { 
       rarData_RequestId : 1399, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'HB & HB+', 
       rarData_Role: 'Contributor',
       rarData_Approver : 'Maryanne', 
       rarData_NeedBy : '12/31/2019',
       rarData_UserList : 'Vithya needs view permissiong (JayaraV)', 
       rarData_Status : 'Completed'
      },
      { 
       rarData_RequestId : 1411, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'RPA', 
       rarData_Role: 'Reader',
       rarData_Approver : 'Vrushali Dixit', 
       rarData_NeedBy : '05/13/2020',
       rarData_UserList : 'Venkat, Bala, Madhu need access reprovisioned', 
       rarData_Status : 'Completed'
      },
      { 
       rarData_RequestId : 20903, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'Messaging Automation', 
       rarData_Role: 'Contributor',
       rarData_Approver : 'Maryanne', 
       rarData_NeedBy : '01/12/2020',
       rarData_UserList : 'Offshore CS team needs access', 
       rarData_Status : 'Completed'
      },
      { 
       rarData_RequestId : 20141, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'Others', 
       rarData_Role: 'Admin',
       rarData_Approver : 'Abhijit', 
       rarData_NeedBy : '07/04/2020',
       rarData_UserList : 'need access to multiple apps', 
       rarData_Status : 'Pending Clarification'
      },
      { 
       rarData_RequestId : 21109, 
       rarData_RequesterId: 'venkatS', 
       rarData_Application: 'Client Server', 
       rarData_Role: 'Administtator',
       rarData_Approver : 'Maryanne', 
       rarData_NeedBy : '03/17/2020',
       rarData_UserList : 'Shrivyas needs admin access to manage DevOps; Bob Pron approved', 
       rarData_Status : 'Completed'
      },
    ];
  
    dataSource = new MatTableDataSource(this.DISPLAY_VIEW);
    //rar_newRequestEntry : rarData;
    i : number;

    //rar_newEntry. = 
  
  constructor(private snackBar : MatSnackBar)
  {
   this.touchDisable = false; 
   //this.resetDisable = false;
  }
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
    //dataSource = ELEMENT_DATA; ==> only for standar display
    // when you need sorting, filtering, pagination etc use the instance of the mat table data source 
    
   }

  ngAfterViewInit()
  {
  
    this.dataSource.sort = this.sort1; // takes care of sorting 
    this.sort1.sortChange.subscribe(() => {
      console.log(1);
      this.dataSource.sort = this.sort1;
    });
    this.dataSource.paginator = this.paginate1;   // takes care of the pagination
    //this.sort1.sortChange.subscribe(() => this.paginator.pageIndex = 0 ); 
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

  this.i = this.DISPLAY_VIEW[this.DISPLAY_VIEW.length - 1 ].rarData_RequestId;
  //this.i = this.DISPLAY_VIEW.length;
  //this.i = this.i - 1;


  this.i = this.i + 1;
  this.DISPLAY_VIEW.push(
    {
      rarData_RequestId   : this.i,
      rarData_RequesterId : this.rarRequesterId.value,
      rarData_Application : this.rarApplication.value,
      rarData_Role        : this.rarRole.value,
      rarData_Approver    : this.rarApprover.value,
      rarData_NeedBy      : new Date(this.rarNeedByDate.value).toString(),
      rarData_UserList    : this.rarUsersList.value,
      rarData_Status      : 'Pending'
    }
  );

    let snackBarRef = this.snackBar.open('Request # ' + this.i + ' Received','Dismiss',{duration:9000});
  //this.resetDisable = false;
  this.touchDisable = true;

  //   snackBarRef.afterDismissed().subscribe(
  //   ()=> {
  //     this.touchDisable = true;
      
  //     //this.rarRequesterId.valid;
  //     //this.rarRequesterId.setValue('');  
  //   })
   }

  
  
// paging, sorting, filtering operations 

applyFilter(filterText : string)
{
    this.dataSource.filter = filterText.trim().toLowerCase();
}

} // close of the AppComponent Class

