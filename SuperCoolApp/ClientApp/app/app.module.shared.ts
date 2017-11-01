import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CellsComponent } from './components/cells/cells.component';
import { PrisonersComponent } from "./components/prisoners/prisoners.component";
import { SearchFilter } from "./components/prisoners/prisoners.component";
import { BrowserModule } from '@angular/platform-browser'; 

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        PrisonersComponent,
        CellsComponent,
        SearchFilter,


    

    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'prisoners', component: PrisonersComponent },
            { path: 'cells', component: CellsComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
