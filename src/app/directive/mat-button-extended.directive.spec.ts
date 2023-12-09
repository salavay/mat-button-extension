import {MatButtonExtendedDirective} from './mat-button-extended.directive';
import {Component, ViewChild} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {BaseTestSpec, MatTooltipVal, ViewerTooltipVal} from "./base-test.spec";

@Component({
  template: `
      <button mat-button
              appMatButtonExtended [isViewerDisabled]="isViewerDisabled" [viewerTooltip]="viewerTooltip"
              [matTooltip]="matTooltipValue">
          Test Button
      </button>`,
  standalone: true,
  imports: [MatButtonModule, MatButtonExtendedDirective, MatTooltipModule]
})
class TestComponent {
  public isViewerDisabled: boolean = false;
  public viewerTooltip: string = ViewerTooltipVal;
  public matTooltipValue: string = MatTooltipVal;

  @ViewChild(MatButton) public matButton!: MatButton;
  @ViewChild(MatTooltip, {static: true}) tooltip!: MatTooltip;
}

class MatButtonExtendedDirectiveTestSpec extends BaseTestSpec<MatButtonExtendedDirective, MatButton, TestComponent> {
  constructor(fixture: ComponentFixture<TestComponent>, component: TestComponent) {
    super(fixture, component, MatButtonExtendedDirective);
  }
}

describe('MatButtonExtendedDirective', () => {

  let testSpec: MatButtonExtendedDirectiveTestSpec;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      imports: [MatButtonModule, MatButtonExtendedDirective, MatTooltipModule, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const testComponent = fixture.componentInstance;

    testSpec = new MatButtonExtendedDirectiveTestSpec(fixture, testComponent);
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
