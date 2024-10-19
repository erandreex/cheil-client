import { Component, inject, OnInit } from '@angular/core';
import { BackLinkComponent } from '../../components/back-link/back-link.component';
import { ModalUserCardComponent } from '../../components/modal-user-card/modal-user-card.component';
import { ModalUserCreateComponent } from '../../components/modal-user-create/modal-user-create.component';
import { ModalUserDeleteComponent } from '../../components/modal-user-delete/modal-user-delete.component';
import { ModalUserUpdateComponent } from '../../components/modal-user-update/modal-user-update.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/response.interface';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-admin-view',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BackLinkComponent,
        ModalUserCardComponent,
        ModalUserCreateComponent,
        ModalUserDeleteComponent,
        ModalUserUpdateComponent,
        JsonPipe,
    ],
    templateUrl: './admin-view.component.html',
    styleUrl: './admin-view.component.css',
})
export class AdminViewComponent implements OnInit {
    public users: User[] = [];
    public userSelect!: User;
    public formSearch!: FormGroup;
    public searchInput: string = '';

    private userService = inject(UserService);
    private fb = inject(FormBuilder);

    public currentPage: number = 1;
    public totalPages: number = 1;
    public itemsPerPage: number = 5;

    ngOnInit(): void {
        this.getUserLists();

        this.formSearch = this.fb.group({
            user: '',
        });

        this.onChangeSearchInput();
    }

    public openModalViewFlag: boolean = false;
    public openModalUpdateFlag: boolean = false;
    public openModalCreateFlag: boolean = false;
    public openModalDeleteFlag: boolean = false;

    openUserCardModal(user: User) {
        this.userSelect = user;
        this.openModalViewFlag = true;
    }

    openUserUpdateModal(user: User) {
        this.userSelect = user;
        this.openModalUpdateFlag = true;
    }

    openUserDeleteModal(user: User) {
        this.userSelect = user;
        this.openModalDeleteFlag = true;
    }

    reloadUserList() {
        this.getUserLists();
    }

    getUserLists() {
        this.userService.getList(this.searchInput, this.currentPage, this.itemsPerPage).subscribe((resp) => {
            this.users = resp.users;
            this.totalPages = Math.ceil(resp.totalUsers / this.itemsPerPage);
        });
    }

    changePage(page: number) {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
        this.getUserLists();
    }

    onChangeSearchInput() {
        this.formSearch
            .get('user')
            ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
            .subscribe((value) => {
                this.searchInput = value;
                this.getUserLists();
            });
    }
}
