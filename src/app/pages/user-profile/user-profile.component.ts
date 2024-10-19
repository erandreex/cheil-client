import { Component, inject, OnInit } from '@angular/core';
import { BackLinkComponent } from '../../components/back-link/back-link.component';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { ModalUserUpdateComponent } from '../../components/modal-user-update/modal-user-update.component';
import { User } from '../../interfaces/response.interface';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, BackLinkComponent, UserCardComponent, ModalUserUpdateComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
    openModalFlag: boolean = false;
    public user!: User;
    public openModalUpdateFlag: boolean = false;
    private authService = inject(AuthService);
    private userservice = inject(UserService);
    private router = inject(Router);
    public idUser: string | undefined = '';
    private route = inject(ActivatedRoute);

    openModal() {
        this.openModalFlag = true;
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.idUser = id || '';

        if (!id) {
            this.getCurrentUser();
        } else {
            this.getUserInfo(id);
        }
    }

    reloadUserList() {
        this.getUserInfo(this.idUser!);
    }

    openUserUpdateModal() {
        this.openModalUpdateFlag = true;
    }

    getCurrentUser() {
        this.authService.getCurrentUser().subscribe({
            next: (result) => {
                this.idUser = result?.id;
                this.getUserInfo(this.idUser!);
            },
            error: (error) => {
                this.router.navigateByUrl('/login');
            },
        });
    }

    getUserInfo(id: string) {
        this.userservice.getUser(id).subscribe({
            next: (result) => {
                this.user = result;
            },
            error: (error) => {
                this.router.navigateByUrl('/forbidden');
            },
        });
    }
}
