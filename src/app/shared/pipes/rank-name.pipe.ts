import { Pipe, PipeTransform } from "@angular/core";
import { OptionItem } from "../../option-item.model";

@Pipe({
  name: 'rankName',
  standalone: true
})
export class RankNamePipe implements PipeTransform {
  public transform(value: number | undefined, rankOptions: OptionItem[]) {
    return rankOptions.find(it => it.value === value)?.label || '???'
  }
}