import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-custom-control',
  template: `{{ value }} `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomControlComponent),
      multi: true,
    },
  ],
})
export class CustomControlComponent implements ControlValueAccessor {
  public value: any;
  public _onChange: (_: any) => void;
  public _onTouched: (_: any) => void;

  constructor(private changeDetection: ChangeDetectorRef) {}

  public writeValue(value: any) {
    this.value = value;
    this.changeDetection.markForCheck();
  }

  public registerOnChange(fn: (_: any) => void) {
    this._onChange = fn;
  }

  public registerOnTouched(fn: (_: any) => void) {
    this._onTouched = fn;
  }
}
