import { ImageClassifier } from './image-classifier';

const modelURL = 'https://teachablemachine.withgoogle.com/models/_QrAB1gc5/';
const ml5Source = 'https://unpkg.com/ml5@0.12.2/dist/ml5.min.js';

export function imageClassifierFactory(): Promise<ImageClassifier> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = () => {
      resolve(new ImageClassifier(modelURL));
    };
    script.src = ml5Source;
    document.head.appendChild(script);
  });
}
