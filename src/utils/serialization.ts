module math {
  export class Serialization {
    static to<T>(obj: T, jsonObj: object): T {
      for (var propName in jsonObj) {
        obj[propName] = jsonObj[propName];
      }
      return obj;
    }
  }
}
