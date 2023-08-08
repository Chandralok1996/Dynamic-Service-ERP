import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: "",
  styles: [""]
})
export class HelloComponent  {
  @Input() name: any;
}
