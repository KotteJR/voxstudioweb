declare module 'vanta/dist/vanta.clouds.min' {
  import { Object3D } from 'three';

  interface VantaCloudsOptions {
    el: HTMLElement;
    THREE: any;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    skyColor?: number;
    cloudColor?: number;
    speed?: number;
  }

  interface VantaCloudsEffect {
    destroy: () => void;
  }

  function CLOUDS(options: VantaCloudsOptions): VantaCloudsEffect;
  export default CLOUDS;
} 