import { Component } from '@angular/core';
import { CurrencyData } from './models/currency-data';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass']
})

export class AppComponent {
	title = 'currency converter';
	data: any;
	eurExchangeRate: number | undefined;
	usdExchangeRate: number | undefined;

	constructor() {
		this.fetchData();
	}

	fetchData() {
		fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
			.then(response => response.json())
			.then((result: CurrencyData[]) => {
				this.data = result;
				this.log(this.data);

				this.eurExchangeRate = this.getExchangeRate('EUR');
				this.usdExchangeRate = this.getExchangeRate('USD');
				this.log(this.eurExchangeRate);
				this.log(this.usdExchangeRate);
			})
			.catch(error => {
				console.error('Something went wrong', error);
			});
	}

	getExchangeRate(currencyCode:string): number | undefined {
		if(this.data) {
			const currency = this.data.find((item:CurrencyData) => item.cc === currencyCode);
			if (currency) {
				return currency.rate;
			}
		}
		return undefined;
	}

	log = (item:any) => {
		console.log(item);
	}
}

