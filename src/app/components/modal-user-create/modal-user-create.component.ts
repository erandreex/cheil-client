import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'component-modal-user-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './modal-user-create.component.html',
    styleUrl: './modal-user-create.component.css',
})
export class ModalUserCreateComponent implements OnInit {
    public formCreate!: FormGroup;
    private userService = inject(UserService);
    public message: string = '';

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
        this.formCreate = this.fb.group({
            Id: '1',
            FirstName: '',
            LastName: '',
            Email: '',
            Password: '',
            Role: '',
        });
    }

    confirmAction() {
        this.message = '';
        this.open = !this.open;
        this.openChange.emit(this.open);
        this.refreshList.emit();
    }

    toggleModal() {
        this.formCreate.reset();
        this.message = '';
        this.open = !this.open;
        this.openChange.emit(this.open);
    }

    createUser() {
        this.userService.createUser(this.formCreate.value).subscribe({
            next: (resp) => {
                this.message = 'User created successfully';
            },
            error: (err) => {
                this.message = 'Error creating user';
                console.error('Error creating user:', err);
            },
        });
    }
}
