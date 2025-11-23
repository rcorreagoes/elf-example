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
import { Router } from '@angular/router';
import { User } from '../../../model/user.model';
import { UserRepository } from '../../../repository/user.repository';

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
  user: User;
  form: FormGroup;

  constructor(
    private readonly userRepository: UserRepository,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = this.userRepository.getActiveId() || {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: { name: '' },
      address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } },
    };
    this.form = this.fb.group({
      name: [this.user?.name || '', Validators.required],
      username: [this.user?.username || '', Validators.required],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', Validators.required],
      website: [this.user?.website || ''],
      companyName: [this.user?.company?.name || ''],
      street: [this.user?.address?.street || ''],
      suite: [this.user?.address?.suite || ''],
      city: [this.user?.address?.city || ''],
      zipcode: [this.user?.address?.zipcode || ''],
    });
  }

  cancel() {
    this.router.navigate(['/list']);
  }

  save() {
    if (this.form.valid) {
      const value = this.form.value;
      const userToSave: User = {
        id: this.user?.id ?? 0,
        name: value.name,
        username: value.username,
        email: value.email,
        phone: value.phone,
        website: value.website,
        company: {
          name: value.companyName,
          catchPhrase: this.user?.company?.catchPhrase ?? '',
          bs: this.user?.company?.bs ?? '',
        },
        address: {
          street: value.street,
          suite: value.suite,
          city: value.city,
          zipcode: value.zipcode,
          geo: this.user?.address?.geo ?? { lat: '', lng: '' },
        },
      };
      this.userRepository.upsertUser(userToSave).subscribe(() => {
        this.cancel();
      });
    }
  }
}
