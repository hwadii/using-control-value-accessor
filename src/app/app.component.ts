import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-custom-control [formControl]="control"></app-custom-control>
    <button (click)="surprise($event)">Click for a surprise</button>
    <br>
    <app-custom-select [options]="options" [formControl]="select"></app-custom-select>
    <button (click)="randomize($event)">Randomize</button>
    <hr>
  `,
  styles: [
    `button, app-custom-control {
      display: inline;
    }`
  ],
})
export class AppComponent implements OnInit {
  public options = ['Value 1', 'Value 2', 'Value 3'];
  public select = new FormControl(this.options[0]);
  public control = new FormControl(Math.random());

  private ngUnsubscribe = new Subject<void>();

  public ngOnInit() {
    this.select.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(console.log);
  }

  public surprise(event: MouseEvent) {
    this.control.patchValue(Math.random());
  }

  public randomize(event: MouseEvent) {
    const choose = () => this.options[Math.floor(Math.random() * this.options.length)];
    let random = choose();
    while (random === this.select.value) {
      random = choose();
    }
    this.select.patchValue(random);
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
