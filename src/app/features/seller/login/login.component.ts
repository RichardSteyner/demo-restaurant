import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Acceso Vendedores</h1>
        <p>Por favor, ingrese sus credenciales</p>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              [(ngModel)]="username" 
              required
              placeholder="Ej: seller1"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="password" 
              required
              placeholder="********"
            >
          </div>
          
          <div *ngIf="errorMessage()" class="error-message">
            {{ errorMessage() }}
          </div>
          
          <button type="submit" [disabled]="isLoading()">
            {{ isLoading() ? 'Cargando...' : 'Iniciar Sesión' }}
          </button>
        </form>

        <div class="test-creds">
          <small>Credenciales de prueba:</small><br>
          <small>Usuario: <code>seller1</code> / Pass: <code>password123</code></small>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
    }
    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    h1 {
      margin-top: 0;
      color: #333;
      font-size: 1.5rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: #e67e22;
      box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.2);
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #e67e22;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover:not(:disabled) {
      background-color: #d35400;
    }
    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .error-message {
      background-color: #fadbd8;
      color: #c0392b;
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    .test-creds {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 6px;
      border: 1px dashed #ccc;
    }
    code {
      background: #eee;
      padding: 2px 4px;
      border-radius: 3px;
    }
  `]
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    username = '';
    password = '';
    isLoading = signal(false);
    errorMessage = signal('');

    onSubmit(): void {
        if (!this.username || !this.password) {
            this.errorMessage.set('Por favor, complete todos los campos.');
            return;
        }

        this.isLoading.set(true);
        this.errorMessage.set('');

        this.authService.login(this.username, this.password).subscribe({
            next: (success) => {
                this.isLoading.set(false);
                if (success) {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/seller/dashboard';
                    this.router.navigateByUrl(returnUrl);
                } else {
                    this.errorMessage.set('Credenciales incorrectas. Intente de nuevo.');
                }
            },
            error: () => {
                this.isLoading.set(false);
                this.errorMessage.set('Ocurrió un error inesperado.');
            }
        });
    }
}
