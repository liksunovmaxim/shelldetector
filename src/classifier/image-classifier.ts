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
      image.src = imageUrl;
      console.log(image);
      this._classifier.then((r) =>
        r.classify(image, (error: any, results: ClassifierResult[]) => {
          console.log(results);
          resolve(results);
        })
      );
    });
  }
}
