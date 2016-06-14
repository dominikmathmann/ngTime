import {Component, Input, OnInit} from '@angular/core'
import {ROUTER_DIRECTIVES} from '@angular/router'

import * as moment from 'moment/moment'

var templateExportMonthLink = `<a [routerLink]="['/export', selector]">{{title}}</a>`;

@Component({
    moduleId: module.id,
    selector: 'ddts-export-month-link',
    template: templateExportMonthLink,
    directives: [ROUTER_DIRECTIVES],
})
export class ExportLinkComponent implements OnInit {

    @Input("add-month")
    addMonth = 99;

    @Input()
    project = "all";

    @Input()
    title = "Export"

    selector = {
        from: "",
        to: "",
        project: ""
    };

    constructor() { }

    ngOnInit() {
        var calcDate = moment().date(1);
        calcDate = calcDate.add(this.addMonth, 'M');
        this.selector.from = calcDate.format("DD.MM.YYYY");
        calcDate = calcDate.add(1, 'M');
        this.selector.to = calcDate.format("DD.MM.YYYY");
        this.selector.project = this.project;
    }
}