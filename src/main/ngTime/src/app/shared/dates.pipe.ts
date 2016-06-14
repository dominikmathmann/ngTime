import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment/moment'

@Pipe({
    name: 'timeToHours'
})
export class TimeToHoursPipe implements PipeTransform {
    transform(value: string, args: any[])        : any {
//        var seconds = +value         / 1000;
//        var numhours = Math.floor(((+seconds % 31536000) % 86400) /         3600);
//        var numminutes = Math.floor((((+seconds % 31536000) % 86400) % 3600)         / 60);
//        var numseconds = (((+seconds % 31536000) % 86400) % 3600) % 60;

        var seconds = Math.floor((+value / 1000) % 60)
        var numminutes = Math.floor((+value / (1000 * 60)) % 60)
        var numhours = Math.floor((+value / (1000 * 60 * 60)))
        return (numhours < 10 ? "0" + numhours : numhours) + ":" + (numminutes < 10 ? "0" + numminutes : numminutes) //+ ":" + (seconds<10?"0"+seconds:seconds);
    }
}

@Pipe({
    name: 'dedate'
})
export class GermanDatePipe implements PipeTransform {
    transform(value: string, args: any[]): any {
        return moment(value).format("DD.MM.YYYY")
    }
}

@Pipe({
    name: 'deDateTime'
})
export class GermanDateTimePipe implements PipeTransform {
    transform(value: string, args: any[]): any {
        return moment(value).format("DD.MM.YYYY HH:mm")
    }
}