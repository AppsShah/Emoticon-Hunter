
import {game} from './game';
import {addClass} from './classes';

const SELECTORS = {
  CAMERA_ELEMENT: '.camera__element--js',
};

const CSS_CLASSES = {
  CAMERA_FRONT_FACING: 'camera-front-facing'
};

export const VIDEO_PIXELS = 224;

export class Camera {

  videoElement: HTMLVideoElement;
  
  snapShotCanvas: HTMLCanvasElement;
  aspectRatio: number;

  constructor() {
    this.videoElement =
      <HTMLVideoElement>document.querySelector(SELECTORS.CAMERA_ELEMENT);
    this.snapShotCanvas = document.createElement('canvas');
  }

  /**
    @async
    @returns {Promise<CameraDimentions>} 
   */
  async setupCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {facingMode: 'environment'}
      });
      (<any>window).stream = stream;
      this.videoElement.srcObject = stream;
      return new Promise(resolve => {
        this.videoElement.onloadedmetadata = () => {
          resolve([this.videoElement.videoWidth,
              this.videoElement.videoHeight]);
        };
      });
    }

    return null;
  }

  /**
   * @param width
   * @param height 
   */
  setupVideoDimensions(width: number, height: number) {
    this.aspectRatio = width / height;

    if (width >= height) {
      this.videoElement.height = VIDEO_PIXELS;
      this.videoElement.width = this.aspectRatio * VIDEO_PIXELS;
    } else {
      this.videoElement.width = VIDEO_PIXELS;
      this.videoElement.height = VIDEO_PIXELS / this.aspectRatio;
    }
  }

  pauseCamera() {
    if (!game.cameraPaused) {
      this.videoElement.pause();
      game.cameraPaused = true;
    }
  }

  unPauseCamera() {
    if (game.cameraPaused) {
      this.videoElement.play();
      game.cameraPaused = false;
    }
  }

  setFrontFacingCamera() {
    addClass(this.videoElement, CSS_CLASSES.CAMERA_FRONT_FACING);
  }

  /**
    @returns
   */
  snapshot() {
    this.snapShotCanvas.height = this.videoElement.height;
    this.snapShotCanvas.width = this.videoElement.width;
    let ctx = this.snapShotCanvas.getContext('2d');
    ctx.drawImage(this.videoElement, 0, 0, this.snapShotCanvas.width,
        this.snapShotCanvas.height);
    let img = new Image();
    img.src = this.snapShotCanvas.toDataURL('image/png').replace('image/png',
        'image/octet-stream');
    return img;
  }
}

export let camera = new Camera();
