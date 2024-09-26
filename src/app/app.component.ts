import {Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {PersonService} from "../services/person.service";
import {HttpClientModule} from "@angular/common/http";
import {AlertService} from "../services/alert.service";
import {PersonTableComponent} from "../components/person-table/person-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MatLabel, ReactiveFormsModule, MatFormField, MatInput, MatButton, MatIcon, FormsModule, PersonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PersonService,AlertService]
})
export class AppComponent  {
  title = 'Married';
  selectedFile: FileList| any;
  private formData = new FormData;

  @ViewChild(PersonTableComponent) childComponent!: PersonTableComponent;
  constructor(private _personService : PersonService,private alert:AlertService) {
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files;
    }
  }

    onSubmit() {
      if (this.selectedFile) {
        this.formData.append('file', this.selectedFile[0]);
        this._personService.uploadFile(this.formData).subscribe({
          next: (x) => {
            this.alert.showAutoCloseSuccess("Secedes add Person")
            this.childComponent.getPerson();
          },
          error: (error) => {
            this.alert.showAutoCloseError("Error")
          }
        });
      }
    }





}
