import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatDialogModule} from '@angular/material/dialog'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list'
import {MatTabsModule} from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  imports: [MatButtonModule,MatSnackBarModule,MatDialogModule,MatSidenavModule,MatMenuModule,MatTooltipModule,
            MatDividerModule,MatToolbarModule,MatIconModule,MatListModule,MatTabsModule,MatPaginatorModule,
            MatFormFieldModule,MatInputModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule, MatRippleModule,MatTableModule,CdkTableModule],
  exports: [MatButtonModule,MatSnackBarModule,MatDialogModule,MatSidenavModule,MatMenuModule,MatTableModule,
            MatDividerModule,MatToolbarModule,MatIconModule,MatListModule,MatTabsModule,MatPaginatorModule,MatTooltipModule,
            MatFormFieldModule,MatInputModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule, MatRippleModule,CdkTableModule],
  declarations: []
})

export class MaterialModule { }
