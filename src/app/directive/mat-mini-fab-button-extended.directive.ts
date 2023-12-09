import {Directive} from '@angular/core';
import {MatMiniFabButton} from "@angular/material/button";
import {ABaseMatButtonExtendedDirective} from "./a-base-mat-button-extended.directive";

@Directive({
  selector: '' +
    ' [appMatButtonExtended][mat-mini-fab][matTooltip]',
  standalone: true
})
export class MatMiniFabButtonExtendedDirective extends ABaseMatButtonExtendedDirective {

  protected override setDisableButton(disabled: boolean): void {
    this.matButton.disabled = disabled;
  }

  constructor(private matButton: MatMiniFabButton) {
    super();
  }

}
