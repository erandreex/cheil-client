import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { delay } from 'rxjs';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    public formLogin!: FormGroup;
    private authService = inject(AuthService);
    private router = inject(Router);
    public message: string = '';

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            Email: '',
            Password: '',
        });

        const tl = gsap.timeline({ repeat: -1 });
        tl.to('h1', { duration: 30, backgroundPosition: '-960px 0' });
    }

    login() {
        this.message = '';
        this.authService
            .login(this.formLogin.value)
            .pipe(delay(500))
            .subscribe({
                next: (result) => {
                    this.router.navigateByUrl('/');
                },
                error: (error) => {
                    this.router.navigateByUrl('/login');
                    this.message = 'unsuccessful authentication, try again!';
                },
            });
    }
}
