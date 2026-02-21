import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold text-primary mb-6 text-center">Contacto</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <!-- Contact Info -->
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-primary mb-2">📍 Ubicación</h3>
              <p class="text-gray-700">123 Calle Principal<br>Ciudad, Estado 12345</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-primary mb-2">📞 Teléfono</h3>
              <p class="text-gray-700">+1 (555) 123-4567</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-primary mb-2">📧 Email</h3>
              <p class="text-gray-700">info&#64;restaurantpro.com</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-primary mb-2">🕐 Horarios</h3>
              <p class="text-gray-700">
                Lunes - Viernes: 11 AM - 10 PM<br>
                Sábado: 12 PM - 11 PM<br>
                Domingo: 12 PM - 10 PM
              </p>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold text-primary mb-4">Envíanos un Mensaje</h3>
            <form class="space-y-4">
              <div>
                <label class="block text-gray-700 font-semibold mb-2">Nombre</label>
                <input 
                  type="text"
                  placeholder="Tu nombre"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">Email</label>
                <input 
                  type="email"
                  placeholder="tu@email.com"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">Asunto</label>
                <input 
                  type="text"
                  placeholder="Asunto"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label class="block text-gray-700 font-semibold mb-2">Mensaje</label>
                <textarea 
                  placeholder="Tu mensaje"
                  rows="4"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                ></textarea>
              </div>

              <button 
                type="submit"
                class="btn-primary w-full">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent { }
