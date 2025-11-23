import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../model/user.model';
import { UserRepository } from '../../../repository/user.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  user: User | null = null;
  form: FormGroup;

  constructor(
    private readonly userRepository: UserRepository,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = this.userRepository.getActiveId();
    this.form = this.fb.group({
      name: [this.user?.name || '', Validators.required],
      username: [this.user?.username || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', Validators.required],
      website: [this.user?.website || ''],
      company: this.fb.group({
        name: [this.user?.company?.name || ''],
      }),
      address: this.fb.group({
        street: [this.user?.address?.street || ''],
        suite: [this.user?.address?.suite || ''],
        city: [this.user?.address?.city || ''],
        zipcode: [this.user?.address?.zipcode || ''],
      }),
    });
  }

  cancel() {
    this.router.navigate(['/user']);
  }

  save() {
    if (this.form.valid && this.user) {
      const value = this.form.value;
      const updatedUser: User = {
        ...this.user,
        ...value,
        company: { ...this.user.company, ...value.company },
        address: { ...this.user.address, ...value.address },
      };
      this.userRepository.updateUser(updatedUser);
    }
  }
}
