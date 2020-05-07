import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-demo';
  notifications = "1";
  showSpinner = false;
  opened = false;
  selectedValue : string;

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
}