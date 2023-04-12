import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, search: string): any {
    if (!search) {
      return value;
    }
    let solution = value.filter((v) => {
      if (!v) {
        return;
      }
      return v.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
    });
    return solution;
  }
}
