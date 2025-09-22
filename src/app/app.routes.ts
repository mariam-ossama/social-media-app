import { PageSelector } from './../../node_modules/lightningcss/node/ast.d';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'timeline', pathMatch: 'full'},
    {
        path: '', component: MainLayoutComponent, children: [
            {path: 'timeline', component: TimelineComponent, title: 'Timeline Page'},
            {path: 'profile', component: ProfileComponent, title: 'Profile Page'},
            {path: 'details', component: PostDetailsComponent, title: 'Post Details Page'},
            {path: 'change-password', component: ChangePasswordComponent, title: 'Change Password Page'},
        ]
    },
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: 'login', component: LoginComponent, title: 'Login Page'},
            {path: 'register', component: RegisterComponent, title: 'Register Page'},
        ]
    },
    {path: '**', component: NotFoundComponent, title: '404-Not Found'}
];
