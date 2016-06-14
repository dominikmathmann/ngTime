import {Injectable, Inject} from '@angular/core'
import {Http} from '@angular/http'

import 'rxjs/add/operator/map';

import {BaseService} from '../../shared/index'

@Injectable()
export class ProjectService extends BaseService<Project>{
    constructor(@Inject('config.restbaseurl') private _baseurl: string, private http:Http){
        super(_baseurl, 'timesheet/projects/', http)
    }

    
}
