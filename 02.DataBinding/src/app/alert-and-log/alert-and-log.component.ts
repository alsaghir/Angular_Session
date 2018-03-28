import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-and-log',
  templateUrl: './alert-and-log.component.html',
  styleUrls: ['./alert-and-log.component.css']
})
export class AlertAndLogComponent implements OnInit {

  @Input() theName: string;

  constructor() { }

  ngOnInit() {
  }

}
