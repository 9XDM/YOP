import { Pipe, PipeTransform } from '@angular/core';

declare const marked: any;

@Pipe({name: 'removeMd'})
export class RemoveMarkdownPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return marked(value).replace(/[<][^>]*[>]/gi, '');
  }
}
