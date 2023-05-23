import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-profilo',
    templateUrl: './profilo.component.html',
    styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
    isEditing: boolean = false;

    constructor(public auth: AuthService) { }

    ngOnInit(): void {
        
    }

    toggleEditing(): void {
        this.isEditing = !this.isEditing;
    }

    sendToServer(): void {
        // Implement your server logic here
    }

    // Inside your component class
    showPassword: boolean = false;

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
