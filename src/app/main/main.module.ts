import { NgModule } from '@angular/core';
import { SharedModule } from '../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarComponent } from './navbar/navbar.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarToggleDirective } from './navbar/navbar-toggle.directive';

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarComponent,
        FuseToolbarComponent,
        FuseNavbarToggleDirective
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule
    ],
    exports     : [
        FuseMainComponent
    ]
})

export class FuseMainModule
{
}