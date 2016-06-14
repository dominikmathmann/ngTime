import {Component, Provider, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES} from "@angular/common";

import * as moment from 'moment/moment'

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => DateInput),
        multi: true
    });

@Component({
    selector: 'date-input',
    template: `
          <input [ngClass]="styleClass" [(ngModel)]="value" (blur)="onTouched()">
  `,
    directives: [CORE_DIRECTIVES],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DateInput implements ControlValueAccessor {

    @Input("style-class")
    styleClass: string;

    //The internal data model
    private _value: any = '';

    //Placeholders for the callbacks
    private _onTouchedCallback: (_: any) => void

    private _onChangeCallback: (_: any) => void

    //get accessor
    get value(): any { return this._value; };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
        }
    }

    //Set touched on blur
    onTouched() {
        if (this._value) {;
            this._onChangeCallback(this.parseDate(this._value));
            this._onTouchedCallback("");
        }

    }

    //From ControlValueAccessor interface, Model > View
    writeValue(value: Date) {
        if (value) {
            this._value = this.formatDate(value);
        }
        else {
            this._value = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    formatDate(inputDate: Date): string {
        return moment(inputDate).format("DD.MM.YYYY HH:mm")

    }

    parseDate(inputString: string): Date {
        return moment(inputString, "DD.MM.YYYY HH:mm").toDate();
    }



}
