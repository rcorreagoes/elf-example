import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-elf',
  standalone: true,
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './about-elf.html',
  styleUrl: './about-elf.scss',
})
export class AboutElf {}
