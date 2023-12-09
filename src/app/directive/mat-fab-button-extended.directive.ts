import {Directive} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {ABaseMatButtonExtendedDirective} from "./a-base-mat-button-extended.directive";

@Directive({
  selector: '' +
    ' [appMatButtonExtended][mat-fab][matTooltip]',
  standalone: true
})
export class MatFabButtonExtendedDirective extends ABaseMatButtonExtendedDirective {

  protected override setDisableButton(disabled: boolean): void {
    this.matButton.disabled = disabled;
  }

  constructor(private matButton: MatFabButton) {
    super();
  }

}
