import { ShellInfo, TTH } from './tth';

export class Describer {
  constructor() {
    TTH.forEach((el) => this.info.set(el.name, el));
  }
  public readonly info: Map<string, ShellInfo> = new Map<string, ShellInfo>();
}
