import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; //view child is for table sorting 
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core'; 
import { Observable} from 'rxjs';
import {map,startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { componentFactoryName } from '@angular/compiler';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'material-demo';
  numbers = [];
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA; ==> only for standar display
  // when you need sorting, filtering, pagination etc use the instance of the mat table data source 
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  @ViewChild(MatSort) sort1 : MatSort; //remember to use sort in the afterview init becuase child as to be loaded
  @ViewChild(MatPaginator) paginate1 : MatPaginator; // this is to paginate the table; also position on ngAgterviewInit


  displayRow(row)
  {
    console.log(row.position);
  }

  applyFilter(filterText : string)
  {
    this.dataSource.filter = filterText.trim().toLowerCase();
  }

  constructor(private snackBar : MatSnackBar, public dialog : MatDialog)
  {
    for (let i=0;i<1000;i++)
    {
      this.numbers.push(i);
    }
  }
 
  openDialog()
  {
    let dialogRef = this.dialog.open(DialogExampleComponent,{data :{name : 'Keshav'}});

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog Result : ${result}`);
    });
  } 
  showCustomSnackBar()
  {
    this.snackBar.openFromComponent(CustomSnackBarComponent,{duration:2000});
  }
  showSnackBar(message,action)
  {
    let snackBarRef = this.snackBar.open(message,action,{duration:2000});
    
    snackBarRef.afterDismissed().subscribe(
      ()=> {
        console.log('The snackbar was dismissed')
      }
    );

    snackBarRef.onAction().subscribe(
      ()=> {
        console.log('The snackbar action was triggered')
      }
    );

  }
  //approvers= ['Maryanne Frake','Abhijit Mukherjee','Vrushali Dixit','Shane Kushin'];
  //applications = ['iClosings','KLO Group','IT Portal','Vendor Management','Settlement Advantage.com','HomeBase','Homebase+','Async/MsgBus',
  //                'Title!Snap','TRUE','CORE','RPA','CORE Connect','$AFE','Others','Go2Agent','Sitefinity','Fast Tool','RPA Forms'];
 
  minDate = new Date();
  maxDate = new Date(2020,6,7); 
      // remember month starts from 0, this is july being shown here.
      // also remember that for < 2 digits of month and year, do not add the leading zero. 
  
  dateFilter = date => 
  {
    const day = date.getDay();
    return day !=0 && day != 6;
  }

  notifications = "1";
  showSpinner = false;
  opened = false;
  selectedValue : string;
  //autoCompleteOptions : string []=['Angular','React','Vue'];
  options : string []=['Angular','React','Vue'];
  autoCompleteObjectOptions = 
 // options = 
  [
    {name : 'Angular Forms'},
    {name : 'React Material'},
    {name : 'Angular Auth'},
    {name : 'Vue MEAN '}
  ];
filteredOptions : Observable<string[]>;

//myControl = new FormControl(['',[Validators.required, Validators.minLength(6),Validators.pattern('^[a-zA-Z]+$')]]);
  
myControl = new FormControl('', [
  Validators.required,
  Validators.minLength(6),
  Validators.pattern('^[a-zA-Z]+$')
]);

nameControl = new FormControl('', [
  Validators.maxLength(10),
  //Validators.pattern('^[a-zA-Z]+$')
]);


ngOnInit()
{
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
  
}

ngAfterViewInit()
{
  this.dataSource.sort = this.sort1 ; // takes care of sorting; this.sort1 comes from the ViewChild  
  this.dataSource.paginator = this.paginate1;   // takes care of the pagination
}

private _filter(value : string) : string[]
{
  const filterValue = value.toLocaleLowerCase();
  return this.options.filter(option => option.toLocaleLowerCase().includes(filterValue)
  );
} 

log(state)
{
  console.log(state);
}

loadData()
{
  this.showSpinner = true;
  setTimeout(()=>
  {
    this.showSpinner = false;
  },5000)
}

displayFn(subject)
{
  return subject ? subject.name : undefined;
}

matcher = new MyErrorStateMatcher();
}

@Component(
  {
    selector : 'custom-snackbar',
    template : `<span style= 'color : orange'> Custom Snackbar</span>`
  }
)

export class CustomSnackBarComponent{}