import {ComponentFixture} from "@angular/core/testing";
import {DebugElement, ProviderToken} from "@angular/core";
import {MatTooltip} from "@angular/material/tooltip";
import {ABaseMatButtonExtendedDirective} from "./a-base-mat-button-extended.directive";

export const ViewerTooltipVal = 'ViewerTooltipVal';
export const MatTooltipVal = 'MatTooltipVal';

type BaseMatButton = {
  disabled: boolean;
}

type TestComponent = {
  isViewerDisabled: boolean;
  viewerTooltip: string;
  matTooltipValue: string;
  tooltip: MatTooltip;
}

export class BaseTestSpec<
  TDirective extends ABaseMatButtonExtendedDirective,
  TButton extends BaseMatButton,
  TComponent extends { matButton: TButton } & TestComponent
> {

  public fixture!: ComponentFixture<TComponent>;
  public testComponent!: TComponent;
  public directive!: TDirective;
  public button!: DebugElement;
  public wrapper!: DebugElement;
  public matButton!: TButton;
  public matTooltip!: MatTooltip;

  constructor(fixture: ComponentFixture<TComponent>, component: TComponent, provider: ProviderToken<TDirective>) {
    this.fixture = fixture;
    this.testComponent = component;

    this.wrapper = fixture.debugElement.children[0];
    this.button = this.wrapper.children[0];
    this.matButton = this.testComponent.matButton;
    this.matTooltip = this.testComponent.tooltip;
    this.directive = this.button.injector.get(provider);
  }

  public shouldCreate() {
    expect(this.directive).toBeTruthy();
  }

  public shouldCheckMatButtonDisabled(expected: boolean) {
    this.testComponent.isViewerDisabled = expected;
    this.fixture.detectChanges();
    expect(this.matButton.disabled).toBe(expected);
  }

  public shouldCheckTooltipMessage(expected: string) {
    spyOn(this.directive as ABaseMatButtonExtendedDirective, 'onMouseEnter').and.callThrough();

    this.testComponent.isViewerDisabled = true;
    this.fixture.detectChanges();
    this.wrapper.nativeElement.dispatchEvent(new Event('mouseenter'));
    this.fixture.detectChanges();

    expect(this.directive.onMouseEnter).toHaveBeenCalled();
    expect(this.matTooltip.message).toBe(expected);
    expect(this.matButton.disabled).toBeTruthy();
  }

  public viewerTooltipWithEmptyMatTooltip() {
    this.testComponent.viewerTooltip = ViewerTooltipVal;
    this.testComponent.matTooltipValue = '';

    this.testComponent.isViewerDisabled = true;
    this.fixture.detectChanges();
    this.wrapper.nativeElement.dispatchEvent(new Event('mouseenter'));
    this.fixture.detectChanges();

    expect(this.matTooltip.message).toBe(ViewerTooltipVal);
  }

  public shouldCheckTooltipMessageKept() {
    this.testComponent.viewerTooltip = ViewerTooltipVal;
    this.testComponent.matTooltipValue = MatTooltipVal;
    this.fixture.detectChanges();

    this.testComponent.isViewerDisabled = true;
    this.fixture.detectChanges();
    this.wrapper.nativeElement.dispatchEvent(new Event('mouseenter'));
    this.fixture.detectChanges();

    expect(this.matTooltip.message).toBe(ViewerTooltipVal);

    this.testComponent.isViewerDisabled = false;
    this.fixture.detectChanges();

    expect(this.matTooltip.message).toBe(MatTooltipVal);
  }
}
