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

    public prisoners: Prisoner[];

    public prisoner: Prisoner = {} as any;

    private headers = new Headers({ 'Content-Type': 'application/json' });



    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        http.get(baseUrl + 'api/prisoners').subscribe(result => {
            this.prisoners = result.json() as Prisoner[];
        }, error => console.error(error));

        console.log("get url " + baseUrl);
    }

    async addPrisoner(name: string, surname: string, dateOfBirth: string, birthPlace: string, residence: string, crime: string, startPen: string, endPen: string, ) {


        //formatta i valori in ingresso dalle input text
        name = name.trim();
        surname = surname.trim();
        dateOfBirth = dateOfBirth.trim();
        birthPlace = birthPlace.trim();
        residence = residence.trim();
        crime = crime.trim();
        startPen = startPen.trim();
        endPen = endPen.trim();

        //assegno i valori acquisiti dall'inputext ai campi dell'oggetto
        this.prisoner.namePrisoner = name;
        this.prisoner.surnamePrisoner = surname;
        this.prisoner.dateOfBirth = new Date(dateOfBirth);
        this.prisoner.birthPlace = birthPlace;
        this.prisoner.residence = residence;
        this.prisoner.crime = crime;
        this.prisoner.startPenality = new Date(startPen);
        this.prisoner.endPenality = new Date(endPen);


        var options = new RequestOptions({
            headers: this.headers
        });

        this.http.put(this.baseUrl + 'api/prisoners/', JSON.stringify(this.prisoner), options).subscribe(res => console.log(res.json()));

        await delay(50);
        this.refresh();

    }


    async updatePrisoner() {

        //assegno i valori acquisiti dall'inputext ai campi dell'oggetto
        this.prisoner.id = parseInt((<HTMLInputElement>document.getElementById("idPrisoner")).value);
        this.prisoner.namePrisoner = (<HTMLInputElement>document.getElementById("name")).value;
        this.prisoner.surnamePrisoner = (<HTMLInputElement>document.getElementById("surname")).value;
        this.prisoner.dateOfBirth = new Date((<HTMLInputElement>document.getElementById("dateOfBirth")).value);
        this.prisoner.birthPlace = (<HTMLInputElement>document.getElementById("birthPlace")).value;
        this.prisoner.residence = (<HTMLInputElement>document.getElementById("residence")).value;
        this.prisoner.crime = (<HTMLSelectElement>document.getElementById("crime")).value;
        this.prisoner.startPenality = new Date((<HTMLInputElement>document.getElementById("startPen")).value);
        this.prisoner.endPenality = new Date((<HTMLInputElement>document.getElementById("endPen")).value);


        var options = new RequestOptions({
            headers: this.headers
        });

        this.http.post(this.baseUrl + 'api/prisoners/?id=' + this.prisoner.id, JSON.stringify(this.prisoner), options).subscribe(res => console.log(res.json()));

        await delay(150);
        this.refresh();

    }


    setUpdateValues(pris: Prisoner){

        (<HTMLInputElement>document.getElementById("idPrisoner")).value = pris.id.toString();
        (<HTMLInputElement>document.getElementById("name")).value = pris.namePrisoner;
        (<HTMLInputElement>document.getElementById("surname")).value = pris.surnamePrisoner;
        (<HTMLInputElement>document.getElementById("dateOfBirth")).value = pris.dateOfBirth.toString();
        (<HTMLInputElement>document.getElementById("birthPlace")).value = pris.birthPlace;
        (<HTMLInputElement>document.getElementById("residence")).value = pris.residence;
        (<HTMLSelectElement>document.getElementById("crime")).value = pris.crime;
        (<HTMLInputElement>document.getElementById("startPen")).value = pris.startPenality.toString();
        (<HTMLInputElement>document.getElementById("endPen")).value = pris.endPenality.toString();
    }


    async deletePrisoner(id: number) {

        var options = new RequestOptions({ headers: this.headers });

        this.http.delete(this.baseUrl + 'api/prisoners/?id=' + id)
            .subscribe(res => console.log(res.json()));

        await delay(50);
        this.refresh();
    }



    refresh(): void {
        window.location.reload();
    }


}



function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class Prisoner {

    id: number;
    namePrisoner: string;
    surnamePrisoner: string;
    dateOfBirth: Date;
    residence: string;
    birthPlace: string;
    crime: string;
    startPenality: Date;
    endPenality: Date;
}
