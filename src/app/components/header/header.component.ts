import { Component, OnInit } from "@angular/core";
import { GetDataService } from '../../services/get-data-service';
import { ICurrencyData } from "../../models/currency-data";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
    constructor(private getDataService: GetDataService) { }

    eurExchangeRate: number | undefined = 0;
    usdExchangeRate: number | undefined = 0;

    ngOnInit() {
        this.getDataService.fetchData().subscribe(
            (result: ICurrencyData[]) => {
                this.eurExchangeRate = this.findCurrency(result, 'EUR')?.rate;
                this.usdExchangeRate = this.findCurrency(result, 'USD')?.rate;
            },
            (error) => {
                console.error('Something went wrong', error);
            }
        );
    }

    findCurrency(array: ICurrencyData[], currencyCode:string) {
        const chosenCurrency = array.find(item => item.cc === currencyCode)
        
        if (chosenCurrency) {
            return chosenCurrency;
        } else {
            return undefined;
        }
    }

}