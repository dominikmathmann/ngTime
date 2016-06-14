import { Component, Input, EventEmitter, Output} from '@angular/core';

import {ProjectService} from '../index'


@Component({
    template: `<select (change)='changed($event.target.value)' class='form-control' [(ngModel)]="currentValue">
        <option *ngFor='let p of projects;let i=index' [value]="i">{{p.customer.name+ ", " + p.name}}</option> 
    </select>`,
    selector: 'ddts-select-project',
    providers: [ProjectService]
})
export class ProjectSelectComponent {
    constructor(private _projectResource: ProjectService) {
        _projectResource.load(99).subscribe(e => {
            this.projects = e;
            if (e.length > 0 && this.project) {
                this.currentValue = this.projects.map(p => p.id).indexOf(this.project.id);
                this.changed(this.currentValue);
            }
            else if (e.length > 0) {
                this.changed(0);
            }
        });
    }

    @Input()
    project: Project;

    @Output()
    projectChange: EventEmitter<Project> = new EventEmitter();
    
    projects: Project[];
    
    currentValue:number=0;
    
    changed(index) {
        this.projectChange.emit(this.projects[index])
    }
}

