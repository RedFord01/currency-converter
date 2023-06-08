import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.sass']
})

export class ConverterComponent {
    @Input() eurExchangeRate!: number | undefined;
    @Input() usdExchangeRate!: number | undefined;
    
    currencyOptions: string[] = ['USD', 'EUR', 'UAH'];

    firstCurrency: string = 'UAH';
    firstCurrencyValue:number = 0;
  
    secondCurrency: string = 'USD';
    secondCurrencyValue:number = 0;

    convertCurrency(fromCurrency: string, toCurrency: string, inputValue: number): number {
        if (fromCurrency === toCurrency) {
            return inputValue;
        } else {
            const exchangeRate = this.getExchangeRate(fromCurrency, toCurrency);
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

    getExchangeRate(fromCurrency: string, toCurrency: string): number | undefined {
        let exchangeRate: number | undefined;
    
        if (fromCurrency === 'EUR' && toCurrency === 'USD') {
            exchangeRate = this.eurExchangeRate && this.usdExchangeRate ? this.eurExchangeRate / this.usdExchangeRate : undefined;
        } else if (fromCurrency === 'USD' && toCurrency === 'EUR') {
            exchangeRate = this.usdExchangeRate && this.eurExchangeRate ? this.usdExchangeRate / this.eurExchangeRate : undefined;
        } else if (fromCurrency === 'USD' && toCurrency === 'UAH') {
            exchangeRate = this.usdExchangeRate ? this.usdExchangeRate : undefined;
        } else if (fromCurrency === 'EUR' && toCurrency === 'UAH') {
            exchangeRate = this.eurExchangeRate ? this.eurExchangeRate : undefined;
        } else if (fromCurrency === 'UAH' && toCurrency === 'USD') {
            exchangeRate = this.usdExchangeRate ? this.usdExchangeRate ** -1 : undefined;
        } else if (fromCurrency === 'UAH' && toCurrency === 'EUR') {
            exchangeRate = this.eurExchangeRate ? this.eurExchangeRate ** -1 : undefined;
        }
        this.log(exchangeRate);
        return exchangeRate;
    }
      

    log = (item:any) => {
		console.log(item);
	}
}