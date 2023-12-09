import {Directive, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {MatTooltip} from "@angular/material/tooltip";

@Directive({
  standalone: true
})
export abstract class ABaseMatButtonExtendedDirective implements OnDestroy, OnInit {

  protected el = inject(ElementRef);
  protected renderer = inject(Renderer2);
  protected matTooltip = inject(MatTooltip);
  protected wrapper!: HTMLElement;

  private hideTimeout?: number;
  private hideDisabledTooltipDelay = 1500;

  private _viewerDisabled = false;

  @Input('isViewerDisabled') set disableControl(value: boolean) {
    this._viewerDisabled = value;
    this.setDisableButton(value);
    if (value) {
      this.renderer.addClass(this.wrapper, 'viewer-disabled');

      this.tooltipValueBeforeDisabling = this.matTooltip.message;

      // dirty hack to prevent tooltip from showing with value from matTooltip="..."
      requestAnimationFrame(() => this.showTooltip());

      this.hideTimeout = setTimeout(() => this.hideTooltip(), this.hideDisabledTooltipDelay);

    } else {
      this.wrapper && this.renderer.removeClass(this.wrapper, 'viewer-disabled');

      clearTimeout(this.hideTimeout);

      this.matTooltip.message = this.tooltipValueBeforeDisabling || '';
    }
  }

  // value of the tooltip from matTooltip="..."
  tooltipValueBeforeDisabling?: string;

  @Input('viewerTooltip') viewerTooltip?: string;

  onMouseEnter(): void {
    this.showTooltip();
  }

  onMouseLeave(): void {
    this.hideTooltip();
  }

  ngOnInit() {
    this.createWrapper();

    this.wrapper.addEventListener('mouseenter', () => this.onMouseEnter());
    this.wrapper.addEventListener('mouseleave', () => this.onMouseLeave());
  }

  ngOnDestroy(): void {
    this.wrapper?.removeEventListener('mouseenter', this.onMouseEnter);
    this.wrapper?.removeEventListener('mouseleave', this.onMouseLeave);

    this.hideTooltip();
  }

  protected showTooltip() {
    if (this.viewerTooltip && this._viewerDisabled) {
      this.matTooltip.message = this.viewerTooltip;
      this.matTooltip.show();
    }
  }

  protected hideTooltip(): void {
    if (this._viewerDisabled) {
      this.matTooltip.hide();
    }
  }

  private createWrapper() {
    this.wrapper = this.renderer.createElement('div');
    const parent = this.el.nativeElement.parentNode;
    const element = this.el.nativeElement;

    this.renderer.setStyle(this.wrapper, 'display', 'inline-block');
    this.renderer.insertBefore(parent, this.wrapper, element);
    this.renderer.appendChild(this.wrapper, element);
  }

  protected abstract setDisableButton(disabled: boolean): void;

}
