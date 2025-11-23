import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./view/about-elf/about-elf').then((m) => m.AboutElf) },
  {
    path: 'detail',
    loadComponent: () => import('./view/user/user-detail/user-detail').then((m) => m.UserDetail),
  },
  {
    path: 'list',
    loadComponent: () => import('./view/user/user-list/user-list').then((m) => m.UserList),
  },
];
