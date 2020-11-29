import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="fg">
      <app-custom-control formControlName="num"></app-custom-control>
      <button (click)="surprise($event)">Click for a surprise</button>
      <br />
      <app-custom-select
        [options]="options"
        formControlName="radio"
      ></app-custom-select>
      <button (click)="randomize($event)">Randomize</button>
    </form>
    <hr />
    <pre>{{ fg.getRawValue() | json }}</pre>
  `,
  styles: [
    `
      button,
      app-custom-control {
        display: inline;
      }
    `,
  ],
})
export class AppComponent {
  public options = ['Value 1', 'Value 2', 'Value 3'];
  public fg = new FormGroup({
    num: new FormControl(Math.random()),
    radio: new FormControl(this.options[0]),
  });

  public surprise(_: MouseEvent) {
    this.fg.get('num').patchValue(Math.random());
  }

  public randomize(_: MouseEvent) {
    const radio = this.fg.get('radio');
    const choose = () =>
      this.options[Math.floor(Math.random() * this.options.length)];
    let random = choose();
    while (random === radio.value) {
      random = choose();
    }
    radio.patchValue(random);
  }
}
