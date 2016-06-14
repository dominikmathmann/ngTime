import { Component, OnInit } from '@angular/core';
import { RouteSegment } from '@angular/router';

import {RecordService, RecordingService} from './shared/index'
import {DateInput} from '../shared/index'
import {ProjectSelectComponent} from '../+projects/shared/index'

@Component({
    moduleId: module.id,
    selector: 'app-record',
    templateUrl: 'record.component.html',
    styleUrls: ['record.component.css'],
    providers: [RecordService, RecordingService],
    directives: [DateInput, ProjectSelectComponent]
})
export class RecordComponent {

    constructor(public recordService: RecordService,public recordingService: RecordingService,  public routeParameters: RouteSegment) {
        var editId = routeParameters.getParam("id");
        if (editId) {
            recordService.loadById(+editId).subscribe(p => recordingService.edit(p));
        }
    }

}

