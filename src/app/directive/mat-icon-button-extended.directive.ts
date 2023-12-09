import {Directive} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {ABaseMatButtonExtendedDirective} from "./a-base-mat-button-extended.directive";

@Directive({
  selector:  '[appMatButtonExtended][mat-icon-button][matTooltip]',
  standalone: true
})
export class MatIconButtonExtendedDirective extends ABaseMatButtonExtendedDirective {

  setDisableButton(disabled: boolean): void {
    this.matButton.disabled = disabled;
  }

  constructor(private matButton: MatIconButton) {
    super();
  }

}
