import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective {

  constructor() { }

  /**
   * Hold the button for this long to make it a long press.
   */
  @Input() duration = 500;

  /**
   * Allow the mouse to move within this scope (a rectangle area with this radius).
   * If more movement is made, the timing will be canceled and no more events will be emitted.
   */
  @Input() movementTolerance = 10;

  @Output() longPress: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnds: EventEmitter<any> = new EventEmitter();
  @Output() earlyRelease: EventEmitter<any> = new EventEmitter();

  private _isPressing: boolean;
  private _isLongPressing: boolean;
  private timeout: NodeJS.Timeout;
  private mouseX = 0;
  private mouseY = 0;
  private resistNextMouseup = false;

  @HostBinding('class.press')
  get isPressing() {
    return this._isPressing;
  }

  @HostBinding('class.longpress')
  get isLongPressing() {
    return this._isLongPressing;
  }

  /**
   * Respond to mousedown events.
   * If the event duration is long enough, trigger "longPress" event once and loop "longPressing" event.
   * @param event
   */
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // Respond to left clicks (main button) only
    if (event.button !== 0) {
      return;
    }

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this._isPressing = true;
    this._isLongPressing = false;

    this.timeout = setTimeout(() => {
      this._isLongPressing = true;
      this.longPress.emit(event);
      this.loop(event);
    }, this.duration);
  }

  /**
   * Add some tolerance to mouse movements.
   * More movements will cancel the operation.
   * @param event
   */
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this._isPressing && !this.isLongPressing) {
      const isInterruptedByX = (event.clientX - this.mouseX) > this.movementTolerance;
      const isInterruptedByY = (event.clientY - this.mouseY) > this.movementTolerance;
      if (isInterruptedByX || isInterruptedByY) {
        this.reset();
        this.resistNextMouseup = true; // If this is not done, "earlyRelease" will be emitted on mouseup.
      }
    }
  }

  /**
   * Respond to mouseup events.
   */
  @HostListener('mouseup')
  onMouseUp() {
    if (this.resistNextMouseup) {
      this.resistNextMouseup = false;
      return;
    }
    // Emit "endPressing" if it's released from a long press
    if (this.isLongPressing) {
      this.reset();
      this.longPressEnds.emit();
    }
    // Or emit "earlyRelease" for a normal click
    else {
      this.reset();
      this.earlyRelease.emit();
    }
  }

  // While long pressing, emit "longPressing" event every 50 ms.
  private loop(event: MouseEvent) {
    if (this._isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  private reset() {
    clearTimeout(this.timeout);
    this._isLongPressing = false;
    this._isPressing = false;
  }
}
