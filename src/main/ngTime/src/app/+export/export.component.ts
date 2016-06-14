import { Component, OnInit } from '@angular/core';
import { RouteSegment } from '@angular/router';
import {RecordService} from '../+record/shared/index'
import {TimeToHoursPipe, GermanDatePipe, GermanDateTimePipe} from '../shared/index'

@Component({
    moduleId: module.id,
    selector: 'app-export',
    templateUrl: 'export.component.html',
    styleUrls: ['export.component.css'],
    providers: [RecordService],
    pipes: [GermanDateTimePipe, GermanDatePipe, TimeToHoursPipe]
})
export class ExportComponent {
    constructor(public recordResource: RecordService, private _routerParams: RouteSegment) {
        var from: string, to: string, project: string;

        from = _routerParams.getParam("from").replace(/-/g, ".")
        to = _routerParams.getParam("to").replace(/-/g, ".")
        project = _routerParams.getParam("project") == "all" ? "" : _routerParams.getParam("project");



        recordResource.loadSummary(from, to, project)
            .subscribe(r => {
                console.log(r);
                this.records = r;
            })
            .add(() => {
                this.records.reverse();
                this.recordsSum = this.records.reduce((count, element) => count + element.sum, 0)
            })
    }

    recordsSum: number;
    records: SummaryDayDTO[];

}