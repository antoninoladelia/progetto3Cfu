import { Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Pipe({
    name: 'searchFilter'
})

export class SearchFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {

        return items.filter(item => {
            for (let key in item) {
                if (("" + item[key]).includes(criteria)) {
                    return true;
                }
            }
            return false;
        });
    }
}

@Component({
    selector: 'prisoners',
    templateUrl: './prisoners.component.html',
    styleUrls: ['./prisoners.component.css']
})
export class PrisonersComponent {

    public prisoners: Prisoner[] ;

    public prisoner: Prisoner = {} as any;

    private headers = new Headers({ 'Content-Type': 'application/json' });



    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        http.get(baseUrl + 'api/prisoners').subscribe(result => {
            this.prisoners = result.json() as Prisoner[];
        }, error => console.error(error));

        console.log("get url " + baseUrl);
    }

    addPrisoner(name: string, date: string, crime: string){


        name = name.trim();
        date = date.trim();
        crime = crime.trim();


        this.prisoner.namePrisoner = name;
        this.prisoner.dateOfBirth = new Date(date);
        this.prisoner.crime = crime;

       // let url = 'http://localhost:63284/api/prisoners/';
        let body = JSON.stringify({"namePrisoner": name,"crime": crime,"dateOfBirth": date});
        //let body = {
        //    "namePrisoner": name,
        //    "crime": crime,
        //    "dateOfBirth": date
        //}

        var options = new RequestOptions({
            headers: this.headers
        });

         this.http.put(this.baseUrl + 'api/prisoners/', JSON.stringify(this.prisoner), options).subscribe(res => console.log(res.json()));

            //.toPromise()
            //.then(() => this.prisoner)
            //.catch(this.handleError);

    }


    deletePrisoner(id: number) {
        
        var options = new RequestOptions({headers: this.headers});


        this.http.delete(this.baseUrl + 'api/prisoners/?id=' + id)
            .subscribe(res => console.log(res.json()));
    }



    refresh(): void {
    window.location.reload();
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}

interface Prisoner {
    id: number;
    namePrisoner: string;
    dateOfBirth: Date;
    crime: string;
}
