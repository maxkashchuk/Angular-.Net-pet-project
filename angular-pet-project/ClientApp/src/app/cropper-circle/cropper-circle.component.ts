import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { lyl, WithStyles, StyleRenderer, ThemeVariables, ThemeRef } from '@alyle/ui';
import {
  STYLES as CROPPER_STYLES,
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent,
  ImgCropperLoaderConfig
} from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { LySliderChange } from '@alyle/ui/slider';
import { LyDialogRef, LY_DIALOG_DATA } from '@alyle/ui/dialog';

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref.renderStyleSheet(CROPPER_STYLES);
  const cropper = ref.selectorsOf(CROPPER_STYLES);

  return {
    root: lyl `{
      ${cropper.root} {
        max-width: 400px
        height: 300px
      }
    }`,
    sliderContainer: lyl `{
      text-align: center
      max-width: 83%
      margin: 14px 14px 0px 14px
    }`,
    slider: lyl
    `{
      width: 10px
    }`,
    cropResult: lyl `{
      border-radius: 50%
    }`
  };
};

@Component({
  selector: 'aui-crop-circle',
  templateUrl: './cropper-circle.component.html',
  styleUrls: ['./cropper-circle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class CropCircleComponent implements WithStyles, AfterViewInit {
  classes = this.sRenderer.renderSheet(STYLES, 'root');
  croppedImage?: string;
  scale: number;
  ready: boolean;
  minScale: number;
  @ViewChild(LyImageCropper, { static: true }) readonly cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 150, // Default `250`
    height: 150, // Default `200`
    fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    round: true
  };

  constructor(readonly sRenderer: StyleRenderer, 
              private _platform: Platform,
              public dialogRef: LyDialogRef,
              @Inject(LY_DIALOG_DATA) public event: Event) { }

  ngAfterViewInit() {
    this.dialogRef.afterOpened.subscribe(() => {
      this.cropper.selectInputEvent(this.event);
    });

  }

  crop()
  {
    this.cropper.crop();
    this.dialogRef.close(this.croppedImage);
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }
  onSliderInput(event: LySliderChange) {
    this.scale = event.value as number;
  }
}
