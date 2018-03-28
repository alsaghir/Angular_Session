import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [];
  newServerName = '';
  newServerContent = '';
  clickCustomEvent = new EventEmitter<String>();

  onAddServer() {
    this.serverElements.push({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.clickCustomEvent.emit('String Value');
    this.serverElements.push({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  executeLogic(event) {
    alert('test');
    alert(typeof event);
    alert(typeof(event) === 'string');
    alert(typeof event === 'string');
  }
}
