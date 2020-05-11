import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; //view child is for table sorting 
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'; 
import { Observable} from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';


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
export class AppComponent implements OnInit, AfterViewInit
{

  currDate = new Date();
  minDate  = new Date();

  ngOnInit()
  {
    //minDate returns today + 3 days as default selector for need by 
    this.minDate = new Date(this.currDate.getTime() + 3 * (1000 * 60 * 60 * 24));
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
  
  rarrequesterId = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('^[a-zA-Z]+$')
  ]);

  // all form definitions & validations end here
  validator = new MyErrorStateMatcher();

} // close of the AppComponent Class

