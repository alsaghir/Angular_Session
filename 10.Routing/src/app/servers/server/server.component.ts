import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit() {
    console.log(this.route.snapshot.data);
    this.route.data.subscribe( (data: Data) => {
                                    this.server = data['server']; // same name on the route path configuration we gave
                                    console.log(data['server']);
                                    console.log(data['testMessage']);

                                  }
      );
  }

  /**
   * Another example of navigating
   * Beware of queryParamsHandling that specifies the behaviour
   * of query parameters existence when navigating to new route
   * SAME ON TEMPLATE
   */
  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
