import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BackLinkComponent } from '../../components/back-link/back-link.component';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterLink, BackLinkComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    public firstname: string | undefined = '';
    public id: string | undefined = '';

    ngOnInit(): void {
        this.getCurrentUser();
    }

    getCurrentUser() {
        this.authService.getCurrentUser().subscribe({
            next: (result) => {
                this.firstname = result?.firstName;
                this.id = result?.id;
            },
            error: (error) => {
                this.router.navigateByUrl('/login');
            },
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
}
