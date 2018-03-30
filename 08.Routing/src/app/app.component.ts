import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  component = 'home';

  // injecting the renderer service since component is directive as well
  constructor(private renderer: Renderer2) { }


  loadComponent(component: string, event: MouseEvent) {

    // getting the name of currently selected compnent
    this.component = component.toLocaleLowerCase();

    // getting the UL parent element using the current clicked on element
    const unorderedListElement = event.toElement.parentElement.parentElement;

    // looping on all LI elements and removing active class
    for (const iterator of Array.from(unorderedListElement.children)) {
      this.renderer.removeClass(iterator, 'active');
    }

    // setting active class on currently selected element
    this.renderer.addClass(event.toElement.parentElement, 'active');
  }

}
