import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

  @Input() justExample: string;


  /**
   * Simply injecting the element selected in the constructor to be
   * member of this class then we can edit it as wanted.
   *
   * NOT RECOMMENDED to edit this elemnent directly though
   * @param elementRef
   */

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
    console.log(this.justExample);
  }
}
