import { Component, AfterViewInit} from '@angular/core';
import { HomeComponent } from './+home';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { ExportComponent } from './+export';
import { ProjectsComponent } from './+projects';
import { RecordComponent } from './+record';
import { ReportComponent } from './+report';
import {ExportLinkComponent} from './+export/shared/index'


declare var jQuery: JQueryStatic;

@Component({
    moduleId: module.id,
    selector: 'ng-time-app',
    templateUrl: 'ng-time.component.html',
    styleUrls: ['ng-time.component.css'],
    directives: [ROUTER_DIRECTIVES, ExportLinkComponent]
})
@Routes([
    { path: '/home', component: HomeComponent },
    { path: '/export', component: ExportComponent },
    { path: '/projects', component: ProjectsComponent },
    { path: '/record', component: RecordComponent },
    { path: '/report', component: ReportComponent }
])
export class NgTimeAppComponent implements AfterViewInit {
    title = 'ng-time works!';

    constructor(private router: Router) { }

    ngAfterViewInit() {
        var sideMenue: any = jQuery('#side-menu');
        sideMenue.metisMenu();

        this.router.navigate(['/home']);
    }
}
