import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from './admin.service';  // Import AdminService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin-module';  // Update the title as needed

  placementDetails: any[] = [];  // Initialize as an empty array to hold placement details
  placementToUpdate = {  // Object to hold placement details for editing
    id: null as any,
    name: "",
    course: "",
    email: ""
  };

  constructor(private adminService: AdminService) {  // Inject AdminService
    this.getPlacementDetails();  // Fetch placement details on initialization
  }

  register(registerForm: NgForm) {
    if (registerForm.valid) {
      this.adminService.registerPlacement(registerForm.value).subscribe(  // Call registerPlacement method from AdminService
        (resp: any) => {
          console.log('Placement registered:', resp);
          registerForm.reset();  // Reset the form after successful registration
          this.getPlacementDetails();  // Refresh the placement details
        },
        (err: any) => {
          console.error('Error registering placement:', err);  // Log errors if any
        }
      );
    }
  }

  getPlacementDetails() {
    this.adminService.getPlacements().subscribe(  // Call getPlacements method from AdminService
      (resp: any[]) => {
        this.placementDetails = resp;  // Assign the fetched data to placementDetails
      },
      (err: any) => {
        console.error('Error fetching placement details:', err);  // Log errors if any
      }
    );
  }

  deletePlacement(placement: any) {  // Method to delete a placement
    this.adminService.deletePlacement(placement.id).subscribe(  // Call deletePlacement method from AdminService
      (resp: any) => {
        console.log('Placement deleted:', resp);
        this.getPlacementDetails();  // Refresh the placement details after deletion
      },
      (err: any) => {
        console.error('Error deleting placement:', err);  // Log errors if any
      }
    );
  }

  edit(placement: any) {  // Method to set placement details for editing
    this.placementToUpdate = { ...placement };  // Populate placementToUpdate with selected placement details
  }

  updatePlacement() {  // Method to update placement details
    if (this.placementToUpdate.id) {
      this.adminService.updatePlacement(this.placementToUpdate).subscribe(  // Call updatePlacement method from AdminService
        (resp: any) => {
          console.log('Placement updated:', resp);
          this.getPlacementDetails();  // Refresh the placement details after update
        },
        (err: any) => {
          console.error('Error updating placement:', err);  // Log errors if any
        }
      );
    }
  }
}
