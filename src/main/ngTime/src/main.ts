import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, ExceptionHandler} from '@angular/core';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from '@angular/http';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router';

import { NgTimeAppComponent, environment } from './app/';
import { GUIExceptionHandler } from './app/shared/index';

import 'jquery'
import 'bootstrap'
import 'metismenu'

if (environment.production) {
    enableProdMode();
}

let restBaseUrl = '/rest/';

class JSONRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.append("Content-Type", "application/json");
    }
}


bootstrap(NgTimeAppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ROUTER_DIRECTIVES,
    HTTP_PROVIDERS,
    provide('config.restbaseurl', { useValue: restBaseUrl }),
    provide(RequestOptions, { useClass: JSONRequestOptions }),
    //provide(ExceptionHandler, { useClass: GUIExceptionHandler })
]); 