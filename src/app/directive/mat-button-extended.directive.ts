import {Directive} from '@angular/core';
import {ABaseMatButtonExtendedDirective} from "./a-base-mat-button-extended.directive";
import {MatButton} from "@angular/material/button";

@Directive({
  selector: '' +
    ' [appMatButtonExtended][mat-button][matTooltip],' +
    ' [appMatButtonExtended][mat-raised-button][matTooltip],' +
    ' [appMatButtonExtended][mat-flat-button][matTooltip],' +
    ' [appMatButtonExtended][mat-stroked-button][matTooltip]',
  standalone: true
})
export class MatButtonExtendedDirective extends ABaseMatButtonExtendedDirective {
  protected override setDisableButton(disabled: boolean): void {
    this.matButton.disabled = disabled;
  }

  constructor(private matButton: MatButton) {
    super();
  }

}
