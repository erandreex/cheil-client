import { Component } from '@angular/core';
import { BackLinkComponent } from '../../components/back-link/back-link.component';

@Component({
    selector: 'app-documentation',
    standalone: true,
    imports: [BackLinkComponent],
    templateUrl: './documentation.component.html',
    styleUrl: './documentation.component.css',
})
export class DocumentationComponent {}
