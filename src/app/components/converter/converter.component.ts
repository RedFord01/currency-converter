import { Component, OnInit } from "@angular/core";
import { GetDataService } from '../../services/get-data-service';
import { ICurrencyData } from "../../models/currency-data";

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.sass']
})
export class ConverterComponent implements OnInit {
    constructor(private getDataService: GetDataService) { }

    currencyOptions: { cc: string, rate: number }[] = [];
    
    firstCurrency!: string;
    firstCurrencyValue: number = 0;
  
    secondCurrency!: string;
    secondCurrencyValue: number = 0;
    
    ngOnInit() {
        this.getDataService.fetchData().subscribe(
            (result: ICurrencyData[]) => {
                this.currencyOptions = result.map(item => ({ cc: item.cc, rate: item.rate}));
                this.currencyOptions.unshift({cc: 'UAH', rate: 1});
                this.log(this.currencyOptions);

                this.firstCurrency = this.currencyOptions[0]?.cc;
                this.secondCurrency = this.currencyOptions[1]?.cc;
            },
            (error) => {
                console.error('Something went wrong', error);
            }
        );
    }
    
    convertCurrency(fromCurrency: string, toCurrency: string, inputValue: number): number {
        if (fromCurrency === toCurrency) {
            return inputValue;
        } else {
            const fromCurrencyRate = this.getCurrencyRate(fromCurrency);
            const toCurrencyRate = this.getCurrencyRate(toCurrency);

            const exchangeRate = this.getExchangeRate(fromCurrency, fromCurrencyRate, toCurrency, toCurrencyRate);
            this.log(exchangeRate);

            if (exchangeRate) {
                return Number((inputValue * exchangeRate).toFixed(2));
            }
        }
        return 0;
    }
    
    convertFirstCurrency() {
        this.secondCurrencyValue = this.convertCurrency(this.firstCurrency, this.secondCurrency, this.firstCurrencyValue);
    }
    
    convertSecondCurrency() {
        this.firstCurrencyValue = this.convertCurrency(this.secondCurrency, this.firstCurrency, this.secondCurrencyValue);
    }

	getCurrencyRate(currencyCode: string): number | undefined {
		if (this.currencyOptions) {
            const currency = this.currencyOptions.find((item) => item.cc === currencyCode);
			if (currency) {
				return currency.rate;
			}
		}
		return undefined;
	}

    getExchangeRate(fromCurrency: string, fromCurrencyRate: number | undefined, toCurrency: string, toCurrencyRate: number | undefined): number | undefined {
        let exchangeRate: number | undefined;
      
        if (fromCurrency === 'UAH' && toCurrency !== 'UAH') {
            exchangeRate = toCurrencyRate ? 1 / toCurrencyRate : undefined;
        } else if (fromCurrency !== 'UAH' && toCurrency === 'UAH') {
            exchangeRate = fromCurrencyRate ? fromCurrencyRate : undefined;
        } else if (fromCurrency !== 'UAH' && toCurrency !== 'UAH') {
            exchangeRate = fromCurrencyRate && toCurrencyRate ? fromCurrencyRate / toCurrencyRate : undefined;
        }

        return exchangeRate;
    }

    log = (item: any) => {
        console.log(item);
    }
}
