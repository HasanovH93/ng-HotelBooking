import { Directive, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appStickyMenu]'
})
export class StickyMenuDirective {

  
  constructor() { }
   @Input() navbarFixed:boolean = false

  
  @HostListener('window:scroll', ['$event']) onScroll(){
    if(window.scrollY > 50){
      this.navbarFixed = true
    }else {
      this.navbarFixed = false
    }
  }

}
