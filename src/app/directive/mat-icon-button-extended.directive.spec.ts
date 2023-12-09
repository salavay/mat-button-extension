import {Component, ViewChild} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {BaseTestSpec, MatTooltipVal, ViewerTooltipVal} from "./base-test.spec";
import {MatIconButtonExtendedDirective} from "./mat-icon-button-extended.directive";
import {MatIconModule} from "@angular/material/icon";

@Component({
  template: `
      <button mat-icon-button
              appMatButtonExtended [isViewerDisabled]="isViewerDisabled" [viewerTooltip]="viewerTooltip"
              [matTooltip]="matTooltipValue">
          <mat-icon>face</mat-icon>
      </button>`,
  standalone: true,
  imports: [MatButtonModule, MatIconButtonExtendedDirective, MatTooltipModule, MatIconModule]
})
class TestComponent {
  public isViewerDisabled: boolean = false;
  public viewerTooltip: string = ViewerTooltipVal;
  public matTooltipValue: string = MatTooltipVal;

  @ViewChild(MatIconButton) public matButton!: MatIconButton;
  @ViewChild(MatTooltip, {static: true}) tooltip!: MatTooltip;
}

class MatIconButtonExtendedDirectiveTestSpec extends BaseTestSpec<MatIconButtonExtendedDirective, MatIconButton, TestComponent> {
  constructor(fixture: ComponentFixture<TestComponent>, component: TestComponent) {
    super(fixture, component, MatIconButtonExtendedDirective);
  }
}

describe('MatIconButtonExtendedDirective', () => {

  let testSpec: MatIconButtonExtendedDirectiveTestSpec;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconButtonExtendedDirective, MatTooltipModule, TestComponent, MatIconModule],
    }).createComponent(TestComponent);
    fixture.detectChanges();
    const testComponent = fixture.componentInstance;

    testSpec = new MatIconButtonExtendedDirectiveTestSpec(fixture, testComponent);
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
