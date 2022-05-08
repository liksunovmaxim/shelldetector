import { ShellInfo, TTH } from './tth';

export class Describer {
  constructor() {
    TTH.forEach((el) => this._info.set(el.name, el));
  }
  private readonly _info: Map<string, ShellInfo> = new Map<string, ShellInfo>();

  public getInfo(name: string): ShellInfo {
    const result = this._info.get(name);
    if (!result) {
      throw new Error();
    }
    return result;
  }
}
