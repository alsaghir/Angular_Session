import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private elrf: ElementRef, // current element of the component
    private router: Router,  // Router service for navigation and other routing tasks
    private route: ActivatedRoute,  // Current activated route with all of its metadata
    private renderer: Renderer2,  // Renderer to access the DOM elements with the correct way
    private authService: AuthService) { }


  ngOnInit() {
  }

  /** 1
   * Example of navigating to route based on specific action
   *
   * NOTE: in TS code you don't know which route you're currently on
   * So use relativeTo method in navigate for example to solve this problem
   *
   * @param id
   */
  onLoadServer(id: number) {
    console.log(this.elrf);
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading', relativeTo: this.route});

  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
