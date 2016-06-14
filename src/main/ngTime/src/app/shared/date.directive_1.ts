import {Directive, Renderer, ElementRef, Input, Output, EventEmitter} from '@angular/core'
import {NgModel, DefaultValueAccessor} from '@angular/common'

import * as moment from 'moment/moment'

@Directive({
    selector: '[tsdate]',
    host: {
        '(change)': 'onChanges($event.target.value)'
    }
})
export class DateDirective extends DefaultValueAccessor {

    constructor(private model: NgModel, private el: ElementRef, private renderer: Renderer) {
        super(renderer, el);
        model.valueAccessor = this;
    }

    writeValue(obj: Date): void {
        if (obj) {
            super.writeValue(this.formatDate(obj));
        }
        else
        {
            super.writeValue("");
        }
    }

    onChanges(value: string) {
        this.onChange(this.parseDate(value));
    }

    formatDate(inputDate: Date): string {
        return moment(inputDate).format("DD.MM.YYYY HH:mm")
        
      }

    parseDate(inputString: string): Date {
        return moment(inputString, "DD.MM.YYYY HH:mm").toDate();
    }
}
