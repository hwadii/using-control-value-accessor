import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-custom-select',
  template: `
    <ul>
      <li
        *ngFor="let option of options"
        [class.selected]="option === value"
        (click)="_value = option"
      >
        {{ option }}
      </li>
    </ul>
  `,
  styles: [
    `
      ul {
        margin: 0;
        padding: 0;
        display: inline-block;
      }
      li {
        margin: 0.2rem;
        list-style-type: none;
      }
      li:hover {
        background-color: coral;
        cursor: pointer;
      }
      .selected {
        color: slategrey;
        font-style: italic;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: any[];
  public value: any;
  public _onChange: any;
  public _onTouched: any;

  constructor(private changeDetection: ChangeDetectorRef) {}

  public set _value(selected: any) {
    this.value = selected;
    this._onChange(selected);
  }

  public writeValue(value: any): void {
    this.value = value;
    this.changeDetection.markForCheck();
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
