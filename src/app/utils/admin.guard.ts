import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getCurrentUser().pipe(
        map((currentUser) => {
            if (!currentUser) {
                router.navigate(['/login']);
                return false;
            }

            if (currentUser.role !== 'Admin') {
                router.navigate(['/forbidden']);
                return false;
            }

            return true;
        }),
        catchError(() => {
            router.navigate(['/forbidden']);
            return of(false);
        })
    );
};
