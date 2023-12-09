import {Component, ViewChild} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatButtonModule, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {BaseTestSpec, MatTooltipVal, ViewerTooltipVal} from "./base-test.spec";
import {MatMiniFabButtonExtendedDirective} from "./mat-mini-fab-button-extended.directive";

@Component({
  template: `
      <button mat-mini-fab
              appMatButtonExtended [isViewerDisabled]="isViewerDisabled" [viewerTooltip]="viewerTooltip"
              [matTooltip]="matTooltipValue">
          Test Button
      </button>`,
  standalone: true,
  imports: [MatButtonModule, MatMiniFabButtonExtendedDirective, MatTooltipModule]
})
class TestComponent {
  public isViewerDisabled: boolean = false;
  public viewerTooltip: string = ViewerTooltipVal;
  public matTooltipValue: string = MatTooltipVal;

  @ViewChild(MatMiniFabButton) public matButton!: MatMiniFabButton;
  @ViewChild(MatTooltip, {static: true}) tooltip!: MatTooltip;
}

class MatMiniFabButtonExtendedDirectiveTestSpec extends BaseTestSpec<MatMiniFabButtonExtendedDirective, MatMiniFabButton, TestComponent> {
  constructor(fixture: ComponentFixture<TestComponent>, component: TestComponent) {
    super(fixture, component, MatMiniFabButtonExtendedDirective);
  }
}

describe('MatMiniFabButtonExtendedDirective', () => {

  let testSpec: MatMiniFabButtonExtendedDirectiveTestSpec;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      imports: [MatButtonModule, MatMiniFabButtonExtendedDirective, MatTooltipModule, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const testComponent = fixture.componentInstance;

    testSpec = new MatMiniFabButtonExtendedDirectiveTestSpec(fixture, testComponent);
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
