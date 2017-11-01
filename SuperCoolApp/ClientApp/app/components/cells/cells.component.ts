import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'cells',
    templateUrl: './cells.component.html'
})
export class CellsComponent {
    public cells: Cell[];

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/cells').subscribe(result => {
            this.cells = result.json() as Cell[];
        }, error => console.error(error));
    }
}


interface Cell {
    NameCourse: string;
}