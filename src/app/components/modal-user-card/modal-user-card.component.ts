import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { User } from '../../interfaces/response.interface';

@Component({
    selector: 'component-modal-user-card',
    standalone: true,
    imports: [CommonModule, UserCardComponent, JsonPipe],
    templateUrl: './modal-user-card.component.html',
    styleUrl: './modal-user-card.component.css',
})
export class ModalUserCardComponent {
    @Input({
        alias: 'open',
        required: true,
    })
    open!: boolean;
    @Input() user!: User; // Propiedad para recibir el objeto User

    @Output() openChange = new EventEmitter<boolean>();

    toggleModal() {
        this.open = !this.open;
        this.openChange.emit(this.open);
    }
}
