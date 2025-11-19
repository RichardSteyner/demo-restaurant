import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          Bienvenido a RestaurantPro 🍽️
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-gray-100">
          Descubre la experiencia culinaria más deliciosa de la ciudad
        </p>
        <button 
          routerLink="/menu"
          class="bg-white text-secondary font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-200 text-lg">
          Explorar Menú
        </button>
      </div>
    </section>
  `
})
export class HeroComponent {}
