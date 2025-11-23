import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { User } from '../../../model/user.model';
import { UserRepository } from '../../../repository/user.repository';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    TranslatePipe,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements AfterViewInit {
  displayedColumns: string[] = ['name', 'username', 'phone', 'company', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly userRepository: UserRepository, private router: Router) {
    this.dataSource.data = this.userRepository.getAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: User) {
    this.userRepository.setActiveId(user.id);
    this.router.navigate(['/detail']);
  }

  deleteUser(user: User) {
    this.userRepository.delete(user.id);
    this.dataSource.data = this.userRepository.getAll();
  }

  get userList() {
    return this.dataSource.data;
  }

  newUser() {
    if (this.userRepository) {
      this.userRepository.setActiveId(null);
    }
    this.router.navigate(['/detail']);
  }
}
