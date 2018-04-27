import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { ServerService } from './server.service';
import { Observable } from 'rxjs/Observable';
import { Server } from './server.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appName = this.serverService.getAppName();
  servers: Server[] = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  constructor(private serverService: ServerService) { }
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  onSave() {
    for (const observableRequest of this.serverService.storeServers(this.servers)) {
      observableRequest.subscribe(
        (response) => console.log('Inside subscribe of get request' + response),
        (error) => console.log(error)
      );
    }
  }
  onGet() {
    this.serverService.getServers()
      .subscribe(
        (servers: any[]) => this.servers = servers,
        (error) => console.log(error)
      );
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
