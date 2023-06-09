import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICurrencyData } from '../models/currency-data';

@Injectable({
  providedIn: 'root'
})

export class GetDataService {
	constructor(private http: HttpClient) { }

	fetchData(): Observable<ICurrencyData[]> {
		return this.http.get<ICurrencyData[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
		.pipe(
			tap((result) => {
				this.log(result);
			})
		);
  }

	log(item: any): void {
		console.log(item);
	}
}
