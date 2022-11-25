import {
  Directive,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appStickyMenu]',
})
export class StickyMenuDirective {
  constructor() {}

  @HostBinding('class.fixed') navbarFixed = false;
  @HostBinding('class.noFixed') navBarNoFixed = false;

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 50) {
      this.navbarFixed = true;
      this.navBarNoFixed = false;
    } else {
      this.navbarFixed = false;
      this.navBarNoFixed = true;
    }
  }
}
