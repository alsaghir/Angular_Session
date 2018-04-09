import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false  // Detecting change will based on objects value instead of onChange detection. Performance issue !!
})
export class FilterPipe implements PipeTransform {


  /**
   * Must return the output as same as the value passed in
   * @param value must be provided
   * @param filterString  additional
   * @param propName additional
   */
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || !filterString) {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
