import { Component, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserRepository } from './repository/user.repository';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatCardModule, MatProgressSpinnerModule, RouterOutlet, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  protected readonly title = signal('elf-example');
  loading = false;
  private globalSub?: Subscription;
  private translate = inject(TranslateService);
  private router = inject(Router) as Router;

  get isAboutElf(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/?');
  }

  get topButtonLabel(): string {
    return this.isAboutElf ? 'ABOUT_ELF.EXAMPLE' : 'ABOUT_ELF.HOME';
  }

  onTopButtonClick() {
    if (this.isAboutElf) {
      this.router.navigate(['/list']);
    } else {
      this.router.navigate(['/']);
    }
  }

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

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
