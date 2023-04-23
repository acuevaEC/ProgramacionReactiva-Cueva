import { Component, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.development'; 
import { AuthService } from '../core/services/auth.service';
import { Usuario } from '../core/models';
import { Observable, Subject, Subscription, filter, map, takeUntil } from 'rxjs';
import links from './nav-items';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  showFiller = false;
  isProd = environment.isProduction;

  authUser$: Observable<Usuario>;

  links = links;

  destroyed$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    this.authUser$ = this.authService.obtenerUsuarioAutenticado()

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.router.navigate(['auth', 'login']);
  }
}
