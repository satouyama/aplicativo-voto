import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HookService {

  private static emitters: {[nomeEvento: string]: EventEmitter<any>} = {}

  static get (nomeEvento:string): EventEmitter<any> {
      if (!this.emitters[nomeEvento])
          this.emitters[nomeEvento] = new EventEmitter<any>();
      return this.emitters[nomeEvento];
  }
}
