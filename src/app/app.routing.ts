import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards'},

    { 
        path: 'dashboards',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        loadChildren: () => import('app/modules/admin/consumer-economy/consumer-economy.module').then(m => m.ConsumerEconomyModule) 
    }
];
