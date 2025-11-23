import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../../model/user.model';
import { UserRepository } from '../../../repository/user.repository';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, MatCardModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements AfterViewInit {
  displayedColumns: string[] = ['name', 'username', 'phone', 'company', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly userRepository: UserRepository, private router: Router) {
    this.userRepository
      .fetchCollection()
      .subscribe({
        next: (result) => {
          this.dataSource.data = result;
          console.log(result);
        },
      })
      .unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: User) {
    this.userRepository.setActiveId(user.id);
    this.router.navigate(['/detail']);
  }

  deleteUser(user: User) {
    // Implemente a lógica de exclusão aqui (ex: abrir dialog de confirmação)
    console.log('Excluir usuário:', user);
  }

  get userList() {
    return this.dataSource.data;
  }
}
