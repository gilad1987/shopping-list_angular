import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productUnChecked'
})
export class ProductUnCheckedPipe implements PipeTransform {

    transform(products: any, args?: any): any {
        return products.filter((p) => !p.checked);
    }

}
