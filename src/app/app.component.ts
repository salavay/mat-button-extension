import {Component, computed, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonExtendedDirective} from "./directive/mat-button-extended.directive";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconButtonExtendedDirective} from "./directive/mat-icon-button-extended.directive";
import {MatFabButtonExtendedDirective} from "./directive/mat-fab-button-extended.directive";
import {MatMiniFabButtonExtendedDirective} from "./directive/mat-mini-fab-button-extended.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatButtonExtendedDirective,
    MatIconButtonExtendedDirective,
    MatFabButtonExtendedDirective,
    MatMiniFabButtonExtendedDirective,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  buttonsDisabled = signal(false);
  indexes = [1, 2, 3];
  cnt = signal<number>(0);

  toggleDisable(checked: boolean) {
    this.buttonsDisabled.set(checked);
    this.cnt.set(this.cnt() + 1);
  }

  viewerTooltipVal = computed(() => 'ViewerTooltip val: ' + this.cnt());
}
