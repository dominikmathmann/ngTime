import { Injectable, EventEmitter} from '@angular/core';
import {RecordService} from './record.service'

@Injectable()
export class RecordingService {
    constructor(private recordResource: RecordService) {
    }

    running: boolean;
    runningEvent: EventEmitter<boolean> = new EventEmitter();
    activeRecord: Record = <Record>{};


    edit(record: Record) {
        this.activeRecord = record;
    }

    start() {
        this.running = true;
        this.runningEvent.emit(true);
        this.activeRecord.startTime = new Date();
    }

    stop() {
        this.running = false;
        this.runningEvent.emit(false);
        this.activeRecord.endTime = new Date();
    }

    cancel() {
        this.stop();
        var currentProject = this.activeRecord.project
        this.activeRecord = <Record>{ project: currentProject };
    }

    save() {
        this.recordResource.save(this.activeRecord).subscribe();
        var currentProject = this.activeRecord.project
        this.activeRecord = <Record>{ project: currentProject };
    }

    getTime() {
        var runtime;
        if (this.running) {
            runtime = 0;
        }
        else if (this.activeRecord.endTime && this.activeRecord.startTime) {
            runtime = this.activeRecord.endTime.getTime() - this.activeRecord.startTime.getTime();
        }

        return runtime;
    }

}