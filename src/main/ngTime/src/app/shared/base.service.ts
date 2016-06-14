import {Injectable, Inject} from '@angular/core'
import { Http, URLSearchParams, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService<T> {

    restUrl: string;

    transform(response: Response): any{
        return response.json();
    }

    constructor(private baseurl:string, url: string, private _httpbase: Http) {
        this.restUrl = baseurl + url;
    }
    

    save(record: T): Observable<T> {
        return this._httpbase.post(this.restUrl, JSON.stringify(record))
            .map (data => this.transform(data));
    }

    loadById(id: number): Observable<T> {
        return this._httpbase.get(this.restUrl+ "load/" + id)
            .map(e => this.transform(e));
    }

    load(max): Observable<T[]> {
        var options: URLSearchParams = new URLSearchParams();
        options.append("max", max)

        return this._httpbase.get(this.restUrl, { search: options })
            .map(e => this.transform(e))
    }

}
