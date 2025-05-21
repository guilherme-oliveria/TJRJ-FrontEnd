import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'anoPublicacao'
})
export class AnoPublicacaoPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';

        const onlyNumbers = value.replace(/\D/g, '').substring(0, 4);

        return onlyNumbers;
    }
}
