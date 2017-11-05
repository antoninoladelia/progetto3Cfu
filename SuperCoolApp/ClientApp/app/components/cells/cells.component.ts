import { Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'cells',
    templateUrl: './cells.component.html',
    styleUrls: ['./cells.component.css']
})
export class CellsComponent {

    public cells: Cell[];
    public cell: Cell = {} as any;

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private  options = new RequestOptions({ headers: this.headers });

    constructor(public http: Http, @Inject('BASE_URL') public baseUrl: string) {
        
        http.get(baseUrl + 'api/cells').subscribe(result => {
            this.cells = result.json() as Cell[];
        }, error => console.error(error));
       
        //this.createCells();
    }

    async  addPrisoner() {
        this.cell.id = parseInt((<HTMLInputElement>document.getElementById("cellNumber")).value);
        this.cell.block = (<HTMLInputElement>document.getElementById("block")).value;
        this.cell.prisoner1 = parseInt((<HTMLInputElement>document.getElementById("idPrisoner1")).value);
        this.cell.prisoner2 = parseInt((<HTMLInputElement>document.getElementById("idPrisoner2")).value);

        this.http.post(this.baseUrl + 'api/cells/?id=' + this.cell.id, JSON.stringify(this.cell), this.options).subscribe(res => console.log(res.json()));

        await delay(50);
        this.refresh();
        
    }

    async  createCells() {

        for (let i = 0; i < 10; i++){
            let body = {
            "id": i,
            "block": "A",
            "prisoner1": null ,
            "prisoner2": null
            }

            this.http.put(this.baseUrl + 'api/cells', JSON.stringify(body), this.options).subscribe(res => console.log(res.json()));
        
        }


        
    }




    setUpdateValues(cella: Cell) {

        (<HTMLInputElement>document.getElementById("cellNumber")).value = cella.id.toString();
        (<HTMLInputElement>document.getElementById("block")).value = cella.block;
        (<HTMLInputElement>document.getElementById("idPrisoner1")).value = cella.prisoner1.toString();
        (<HTMLInputElement>document.getElementById("idPrisoner2")).value = cella.prisoner2.toString();

    }

    refresh(): void {
        window.location.reload();
    }

}


     function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Cell {
    id: number;
    block: string;
    prisoner1: number;
    prisoner2: number;
}