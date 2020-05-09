import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Observable} from 'rxjs';
import {map,startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { componentFactoryName } from '@angular/compiler';
//import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'material-demo';
 
  constructor(private snackBar : MatSnackBar)
  {

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

myControl = new FormControl();

ngOnInit()
{
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
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

}

@Component(
  {
    selector : 'custom-snackbar',
    template : `<span style= 'color : orange'> Custom Snackbar</span>`
  }
)

export class CustomSnackBarComponent{}