import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/common/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './pages/common/layout/layout.component';
import { BookMasterComponent } from './pages/book-inventory/book-master/book-master.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthLayoutComponent } from './pages/common/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { BookCategoryComponent } from './pages/book-inventory/book-category/book-category.component';
import { BookTransactionComponent } from './pages/book-inventory/book-transaction/book-transaction.component';
import { AllTransactionComponent } from './pages/book-inventory/all-transaction/all-transaction.component';
import { UserTransactionComponent } from './pages/book-inventory/user-transaction/user-transaction.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'book-master', component: BookMasterComponent },
      { path: 'book-categories', component: BookCategoryComponent },     
      { path: 'all-transactions', component: AllTransactionComponent },
      { path: 'user-transactions', component: UserTransactionComponent }, 
      { path: 'book-transactions/:id', component: BookTransactionComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
