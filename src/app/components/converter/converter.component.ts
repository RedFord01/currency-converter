import { Component, OnInit } from "@angular/core";
import { GetDataService } from '../../services/get-data-service';
import { ICurrencyData } from "../../models/currency-data";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.sass']
})
export class ConverterComponent implements OnInit {
  currencyOptions: { cc: string, rate: number }[] = [];
  converterForm: FormGroup;

  constructor(private getDataService: GetDataService, private formBuilder: FormBuilder) {
    this.converterForm = this.formBuilder.group({
      firstCurrencyValue: 0,
      firstCurrency: '',
      secondCurrencyValue: 0,
      secondCurrency: ''
    });
  }

  ngOnInit() {
    this.getDataService.fetchData().subscribe(
      (result: ICurrencyData[]) => {
        this.currencyOptions = result.map(item => ({ cc: item.cc, rate: item.rate }));
        this.currencyOptions.unshift({ cc: 'UAH', rate: 1 });

        this.converterForm.patchValue({
          firstCurrency: this.currencyOptions[0]?.cc,
          secondCurrency: this.currencyOptions[1]?.cc
        });
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

      if (exchangeRate) {
        return Number((inputValue * exchangeRate).toFixed(4));
      }
    }
    return 0;
  }

  convertFirstCurrency() {
    const { firstCurrency, secondCurrency, firstCurrencyValue } = this.converterForm.value;
    this.converterForm.patchValue({
      secondCurrencyValue: this.convertCurrency(firstCurrency, secondCurrency, firstCurrencyValue)
    });
  }

  convertSecondCurrency() {
    const { firstCurrency, secondCurrency, secondCurrencyValue } = this.converterForm.value;
    this.converterForm.patchValue({
      firstCurrencyValue: this.convertCurrency(secondCurrency, firstCurrency, secondCurrencyValue)
    });
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
