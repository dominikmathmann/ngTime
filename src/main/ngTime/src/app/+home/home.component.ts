import {Component} from '@angular/core'
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router'

import {SummaryBlockComponent} from './shared/index'

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    directives: [SummaryBlockComponent, ROUTER_DIRECTIVES],
    providers: [ROUTER_DIRECTIVES]
})
export class HomeComponent {
    constructor(){}
}

