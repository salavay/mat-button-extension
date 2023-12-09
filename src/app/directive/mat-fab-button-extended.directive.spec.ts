import {MatFabButtonExtendedDirective} from './mat-fab-button-extended.directive';
import {Component, ViewChild} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {BaseTestSpec, MatTooltipVal, ViewerTooltipVal} from "./base-test.spec";

@Component({
  template: `
      <button mat-fab
              appMatButtonExtended [isViewerDisabled]="isViewerDisabled" [viewerTooltip]="viewerTooltip"
              [matTooltip]="matTooltipValue">
          Test Button
      </button>`,
  standalone: true,
  imports: [MatButtonModule, MatFabButtonExtendedDirective, MatTooltipModule]
})
class TestComponent {
  public isViewerDisabled: boolean = false;
  public viewerTooltip: string = ViewerTooltipVal;
  public matTooltipValue: string = MatTooltipVal;

  @ViewChild(MatFabButton) public matButton!: MatFabButton;
  @ViewChild(MatTooltip, {static: true}) tooltip!: MatTooltip;
}

class MatFabButtonExtendedDirectiveTestSpec extends BaseTestSpec<MatFabButtonExtendedDirective, MatFabButton, TestComponent> {
  constructor(fixture: ComponentFixture<TestComponent>, component: TestComponent) {
    super(fixture, component, MatFabButtonExtendedDirective);
  }
}

describe('MatFabButtonExtendedDirective', () => {

  let testSpec: MatFabButtonExtendedDirectiveTestSpec;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      imports: [MatButtonModule, MatFabButtonExtendedDirective, MatTooltipModule, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const testComponent = fixture.componentInstance;

    testSpec = new MatFabButtonExtendedDirectiveTestSpec(fixture, testComponent);
  });

  it('should create an instance', () => {
    testSpec.shouldCreate();
  });

  it('MatButton#disabled should be false', () => {
    testSpec.shouldCheckMatButtonDisabled(false);
  });

  it('MatButton#disabled should be true', () => {
    testSpec.shouldCheckMatButtonDisabled(true);
  });

  it('Tooltip message should change on disabling', () => {
    testSpec.shouldCheckTooltipMessage(ViewerTooltipVal)
  });

  it('Viewer tooltip message with empty matTooltip', () => {
    testSpec.viewerTooltipWithEmptyMatTooltip();
  });

  it('Tooltip message should be kept after disabling', () => {
    testSpec.shouldCheckTooltipMessageKept()
  });

});
