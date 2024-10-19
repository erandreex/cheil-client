import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../interfaces/response.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'component-modal-user-delete',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal-user-delete.component.html',
    styleUrl: './modal-user-delete.component.css',
})
export class ModalUserDeleteComponent implements OnInit, OnChanges {
    private userService = inject(UserService);
    public message: string = '';
    public userId: string = '';

    @Input() user!: User;
    @Input({
        alias: 'open',
        required: true,
    })
    public open!: boolean;

    @Output()
    openChange = new EventEmitter<boolean>();

    @Output() refreshList = new EventEmitter<void>();

    constructor() {}
    ngOnInit(): void {
        if (this.user) {
            this.userId = this.user?.id || '';
        }
    }

    toggleModal() {
        this.message = '';
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    confirmAction() {
        this.message = '';
        this.open = !this.open;
        this.openChange.emit(this.open);
        this.refreshList.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && changes['user'].currentValue) {
            this.userId = this.user?.id || '';
        }
    }

    updateUser() {
        this.userService.deleteUser(this.userId).subscribe({
            next: (resp) => {
                this.message = 'User deleted successfully';
            },
            error: (err) => {
                this.message = 'Error deleting user';
                console.error('Error deleting user:', err);
            },
        });
    }
}
