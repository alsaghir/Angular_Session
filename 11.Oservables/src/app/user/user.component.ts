import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {

    /** 1
     * Here we are subscribing (observing) an angular observable
     * called params which update subjects/subscribers/observers
     * whenever changes
     */
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
  }

  /** 6
   * Subject is consumer and producer of data in the same time
   * here Subject acts as observer inside observable
   */
  onActivate() {
    this.usersService.userActivated.next(this.id);
  }
}
