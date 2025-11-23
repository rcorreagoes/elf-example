import { Component, OnDestroy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRepository } from './repository/user.repository';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  protected readonly title = signal('elf-example');
  loading = false;
  private globalSub?: Subscription;

  constructor(private readonly userRepository: UserRepository) {
    const sub = this.userRepository.fetchCollection().subscribe(() => {});
    this.startLoading(sub);
  }

  startLoading(sub: Subscription) {
    this.loading = true;
    if (this.globalSub) {
      this.globalSub.unsubscribe();
    }
    this.globalSub = sub;
    sub.add(() => {
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.globalSub) {
      this.globalSub.unsubscribe();
      this.loading = false;
    }
  }
}
