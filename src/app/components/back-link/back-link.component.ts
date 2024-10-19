import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'component-back-link',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './back-link.component.html',
    styleUrl: './back-link.component.css',
})
export class BackLinkComponent {}
