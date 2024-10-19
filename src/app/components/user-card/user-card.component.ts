import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/response.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'component-user-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css',
})
export class UserCardComponent {
    @Input() user!: User;
}
