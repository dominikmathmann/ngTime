import {Component, Input} from '@angular/core'
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router'
import {RecordService} from '../../../+record/shared/index'

@Component({
    moduleId: module.id,
    templateUrl: 'summary-block.component.html',
    styleUrls: ['summary-block.component.css'],
    selector: 'dd-ts-timesummary',
    providers: [RecordService],
    directives: [ROUTER_DIRECTIVES]
})
export class SummaryBlockComponent {
    constructor(public timeService: RecordService) {
        this.settings.day = {
            method: timeService.getTotalToday,
            label: 'heute'
        }
        this.settings.week = {
            method: timeService.getTotalWeek,
            label: 'diese Woche'
        }
        this.settings.month = {
            method: timeService.getTotalMonth,
            label: 'dieser Monat'
        }
    }

    ngOnInit() {
        this.label = this.settings[this.type].label;
        this.settings[this.type].method.call(this.timeService).subscribe(e => {
            this.time = (e / 60 / 60).toFixed(2);
        });
    }

    settings: any = {};

    @Input()
    color: string;

    @Input()
    styleClass: string = "col-lg-3 col-md-6";

    @Input()
    icon: string = "col-lg-3 col-md-6";

    @Input()
    type: string = "day";

    @Input()
    route: any;

    time: string;

    label: string;

}