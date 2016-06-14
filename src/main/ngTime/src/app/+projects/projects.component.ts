import { Component, OnInit } from '@angular/core';

import {ProjectService} from './shared/index'


@Component({
    moduleId: module.id,
    selector: 'app-projects',
    templateUrl: 'projects.component.html',
    styleUrls: ['projects.component.css'],
    providers: [ProjectService]
})
export class ProjectsComponent {

    selectedProjectIndex: number;
    projects: Project[]
    project: Project;

    constructor(public projectsResource: ProjectService) {
        projectsResource.load(99).subscribe(projects => {
            this.projects = projects
        });
        this.selectProject();
    }


    selectProject(index?) {
        if (index) {
            this.project = this.projects[index]
        }
        else {
            this.project = <Project>{ customer: <Customer>{} };
        }
    }

    saveProject() {
        this.projectsResource.save(this.project).subscribe(result => {
            this.project = result;
            var index = this.projects.map(e => e.id).indexOf(this.project.id)
            if (index != -1) {
                this.projects.splice(index, 1);
            }
            this.projects.push(this.project);
        })

    }
}

