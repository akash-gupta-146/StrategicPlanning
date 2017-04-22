import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class NavService {

  navchange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  emitNavChangeEvent(number) {
    console.log("SASASA", number)
    this.navchange.emit(number);
  }

  getNavChangeEmitter() {
    return this.navchange;
  }

}