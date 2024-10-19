import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/response.interface';

@Component({
    selector: 'component-modal-user-update',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './modal-user-update.component.html',
    styleUrl: './modal-user-update.component.css',
})
export class ModalUserUpdateComponent implements OnInit, OnChanges {
    public formUpdate!: FormGroup;
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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formUpdate = this.fb.group({
            FirstName: '',
            LastName: '',
            Email: '',
        });

        if (this.user) {
            this.updateForm();
        }
    }

    toggleModal() {
        this.formUpdate.reset();
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
        this.updateForm();
        if (changes['user'] && changes['user'].currentValue) {
            this.updateForm();
        }
    }

    updateForm(): void {
        if (this.user) {
            this.formUpdate.patchValue({
                FirstName: this.user?.firstName || '',
                LastName: this.user?.lastName || '',
                Email: this.user?.email || '',
            });
            this.userId = this.user?.id || '';
        }
    }

    updateUser() {
        this.userService.updateUser(this.userId, this.formUpdate.value).subscribe({
            next: (resp) => {
                this.message = 'User updated successfully';
            },
            error: (err) => {
                this.message = 'Error updating user';
                console.error('Error updating user:', err);
            },
        });
    }
}
