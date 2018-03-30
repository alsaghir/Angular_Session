import { EventEmitter, Injectable } from '@angular/core';

import { LoggingService } from './logging.service';

@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {}

  /**
   * By service class we can:
   *
   * Inject instance (or multiple instances) to work with in multiple components
   * Set shared properties values as wanted in the service like accounts array
   * Fire/emit events of the service to effect whoever listenning
   * Inject service into another service to do common tasks
   *
   */

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
