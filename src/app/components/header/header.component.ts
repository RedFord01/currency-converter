import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})

export class HeaderComponent {
    @Input() eurExchangeRate!: number | undefined;
    @Input() usdExchangeRate!: number | undefined;
}