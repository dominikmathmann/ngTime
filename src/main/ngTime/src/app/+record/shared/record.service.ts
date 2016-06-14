import {Injectable, Inject} from '@angular/core'
import { Http, URLSearchParams, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {BaseService} from '../../shared/index'
import * as moment from 'moment/moment'


@Injectable()
export class RecordService extends BaseService<Record>{

    constructor( @Inject('config.restbaseurl') private _baseurl: string, private _http: Http) {
        super(_baseurl, "timesheet/records/", _http);
    }

    loadSum(from?: string, to?: string): Observable<SummaryDayDTO> {
        var params: URLSearchParams = new URLSearchParams();
        params.append("from", from);
        params.append("to", to);

        return this._http.get(this._baseurl + "timesheet/records/sum", { search: params })
            .map(resp => resp.json())
    }

    loadLast(): Observable<Record> {
        return this._http.get(this._baseurl + "timesheet/records/last")
            .map(resp => resp.json())
            .map(e => this.transformRecord(e))
    }


    transform(response: Response): any {
        var jsonResponse = response.json();
        if (jsonResponse instanceof Array) {
            return jsonResponse.map(e => this.transformRecord(e));
        }
        else {
            return this.transformRecord(jsonResponse);
        }
    }

    transformRecord(record: Record): Record {
        record.startTime = new Date(+record.startTime);
        record.endTime = new Date(+record.endTime);
        return record;
    }


    loadSummary(from?: string, to?: string, project?: string): Observable<SummaryDayDTO[]> {
        from = !from ? "01.01." + new Date().getFullYear() : from;
        to = !to ? "01.01." + (new Date().getFullYear() + 1) : to;
        project = !project ? '' : project;
        var params: URLSearchParams = new URLSearchParams();
        params.append("from", from);
        params.append("to", to);
        params.append("project", project);

        return this._http.get(this._baseurl + "timesheet/records/summary", { search: params })
            .map(e => e.json())
    }

    private getTotal(from: Date, to: Date): Observable<number> {
        var fromd = moment(from).format("DD.MM.YYYY");
        var tod = moment(to).format("DD.MM.YYYY");

        return this.loadSum(fromd, tod).map(e => e.sum);
    }

    getTotalToday() {
        var from = moment();
        var to = moment().add(1, 'days');

        return this.getTotal(from.toDate(), to.toDate());
    }

    getTotalWeek() {
        var from = moment().hour(0).weekday(0);
        var to = moment().hour(23).weekday(7);

        return this.getTotal(from.toDate(), to.toDate());
    }

    getTotalMonth() {
        var from = moment().hour(0).date(1);
        var to = moment().hour(0).date(1).add(1, 'months');

        return this.getTotal(from.toDate(), to.toDate());
    }
}