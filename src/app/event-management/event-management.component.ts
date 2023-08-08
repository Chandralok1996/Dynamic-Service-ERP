import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateComponent } from './event-create.component';
@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})

export class EventManagementComponent {
  constructor(public dialog: MatDialog) {}
  isCompleted: boolean = false;

  ngOnInit(): void {
    this.isCompleted = true;
  }

  openEventCreateDialog() {
    const dialogRef = this.dialog.open(EventCreateComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

}
