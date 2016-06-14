import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES} from '@angular/router';
import {RecordService} from '../+record/shared/index'
import {GermanDateTimePipe, GermanDatePipe, TimeToHoursPipe} from '../shared/index'

import * as moment from 'moment/moment'
import 'jquery'
import 'datatables.net'

@Component({
  moduleId: module.id,
  selector: 'app-report',
  templateUrl: 'report.component.html',
  styleUrls: ['report.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [RecordService],
  pipes: [GermanDateTimePipe, GermanDatePipe, TimeToHoursPipe]
})
export class ReportComponent {
   constructor(private recordResource: RecordService) {
        this.loadData(() => { setTimeout(this.initTable.bind(this), 100) });
    }

    private loadData(callback = undefined, maxCount = 10) {
        this.recordResource.load(maxCount).subscribe(records => {
            this.records = records;
            callback();
        })
    }

    public initTable() {
        var tableSettings = {
            paging: true,
            searching: true,
            info: false,
            lengthMenu: [10, 50, 500],
            columnDefs: [{
                targets: 0,
                orderable: false
            }]
        }
        if (!jQuery.fn.DataTable.fnIsDataTable('#timeTable')) {
            var table: any = $('#timeTable');

            var tbl = table.DataTable(tableSettings);
            var context = this;
            tbl.on("length.dt", (event, settings, length) => {
                this.loadData(() => { tbl.draw() }, length);
            });
        }
    }


    records: Record[];
}