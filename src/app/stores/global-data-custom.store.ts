import { Injectable } from "@angular/core";
import { GlobalDataStore } from "./global-data.store";

@Injectable()
export class GlobalDataStore2 extends GlobalDataStore {
  public constructor() {
    super();
    console.log('GlobalDataStore2 inits')
  }
}