import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { take } from 'rxjs/internal/operators/take';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective implements OnInit {
  @Output() public clickOutside = new EventEmitter();
  captured = false;
  constructor(private _elementRef: ElementRef) {}
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (!this.captured) {
      return;
    }
    if (!this._elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit();
    }
  }
  ngOnInit() {
    fromEvent(document, 'click', { capture: true })
      .pipe(take(1))
      .subscribe(() => (this.captured = true));
  }
}
