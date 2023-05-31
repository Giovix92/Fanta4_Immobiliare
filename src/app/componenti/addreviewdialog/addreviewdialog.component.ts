import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/auth/auth.service';
import { ServiceService } from 'src/app/Service/service.service';
import { AnnuncioComponent } from '../annuncio/annuncio.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-addreviewdialog',
  templateUrl: './addreviewdialog.component.html',
  styleUrls: ['./addreviewdialog.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatCheckboxModule],
  standalone: true,
})
export class AddreviewdialogComponent {
  @ViewChild('descriptionInput') descriptionInput?: ElementRef;
  @ViewChild('myCheckbox') checkbox?: ElementRef;
  selectedStars: any;
  isChecked: boolean = false;

  constructor(
    private auth: AuthService,
    private service: ServiceService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // Attach change event listener to radio buttons
    radioButtons.forEach((radioButton) => {
      this.renderer.listen(radioButton, 'change', (event) => {
        this.selectedStars = (event.target as HTMLInputElement).value;
      });
    });
  }

  addReview(): void {
    // Get the value of the textarea
    const descriptionValue = this.descriptionInput?.nativeElement.value;

    // Get the value of the selected stars
    const starsNumber = parseInt(this.selectedStars, 10);

    this.service.setRecensione({
      id: null,
      immobile: this.auth.lastAnnuncioVisited,
      titolo: descriptionValue,
      rating: starsNumber,
      autore: localStorage.getItem('id'),
    }).subscribe();
  }
}
