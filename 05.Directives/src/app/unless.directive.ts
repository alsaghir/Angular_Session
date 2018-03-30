import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  /**
   *
   * @param templateRef
   * This is the ng-template to decide when to render it.
   * Template is what to render
   *
   * @param vcRef
   * View Container is WHERE to render
   *
   * A simple structural directive like this one creates an embedded view from the
   * Angular-generated <ng-template> and inserts that view in a view container adjacent to the directive's original <p> host element.
   * You'll acquire the <ng-template> contents with a TemplateRef and access the view container through a ViewContainerRef. 
   *
   */
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }


  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

}
