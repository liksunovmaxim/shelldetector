declare const ml5: { imageClassifier(url: string): Promise<any> };

export interface ClassifierResult {
  label: string;
  confidence: number;
}

export class ImageClassifier {
  private readonly _urlCreator = window.URL || window.webkitURL;
  private readonly _classifier: Promise<any>;

  constructor(imageModelURL: string) {
    this._classifier = ml5.imageClassifier(`${imageModelURL}model.json`);
  }

  public classify(imageFile: Blob): Promise<ClassifierResult[]> {
    return new Promise<ClassifierResult[]>((resolve) => {
      const imageUrl = this._urlCreator.createObjectURL(imageFile);
      const image = document.createElement('img');
      image.onload = () => {
        // eslint-disable-next-line no-underscore-dangle
        this._classifier.then((r) =>
          r.classify  (image, (error: any, results: ClassifierResult[]) => {
            resolve(results);
          })
        );
      };
      image.src = imageUrl;
    });
  }

  public classifyByPath(dataUrl: string): Promise<ClassifierResult[]> {
    return new Promise<ClassifierResult[]>((resolve) => {
      // eslint-disable-next-line no-underscore-dangle
      const image = document.createElement('img');
      image.onload = () => {
        // eslint-disable-next-line no-underscore-dangle
        this._classifier.then((r) =>
          r.classify(image, (error: any, results: ClassifierResult[]) => {
            resolve(results);
          })
        );
      };

      image.src = dataUrl;
    });
  }

  public classifyByImage(image: HTMLImageElement): Promise<ClassifierResult[]> {
    return new Promise<ClassifierResult[]>((resolve) => {
      this._classifier.then((r) =>
        r.classify(image, (error: any, results: ClassifierResult[]) => {
          resolve(results);
        })
      );
    });
  }
}
