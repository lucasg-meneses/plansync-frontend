import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-auth-modal-page-template',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './auth-modal-page-template.component.html',
  styleUrl: './auth-modal-page-template.component.scss',
})
export class AuthModalPageTemplateComponent {
  @Input() title: string = "Set Title";
}
