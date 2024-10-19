import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-index',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
})
export class IndexComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    private subscription: Subscription = new Subscription();

    ngOnInit(): void {
        const fiveMinutesInMilliseconds = 5 * 60 * 1000;

        this.validateAuth();

        this.subscription = interval(fiveMinutesInMilliseconds).subscribe((resp) => {
            this.renewToken();
        });
    }

    validateAuth() {
        this.authService.isAuthenticated().subscribe({
            next: (result) => {},
            error: (error) => {
                this.router.navigateByUrl('/login');
            },
        });
    }

    renewToken() {
        this.authService.renewtoken().subscribe({
            next: (result) => {},
            error: (error) => {
                this.router.navigateByUrl('/login');
            },
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
