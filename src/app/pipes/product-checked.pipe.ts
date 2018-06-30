import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productChecked'
})
export class ProductCheckedPipe implements PipeTransform {

    transform(products: any, args?: any): any {
        return products.filter((p) => p.checked);
    }

}
