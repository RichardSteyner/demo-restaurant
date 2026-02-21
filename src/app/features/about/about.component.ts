import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl font-bold text-primary mb-6">Acerca de Nosotros</h1>
        
        <div class="bg-white rounded-lg shadow-lg p-8">
          <p class="text-gray-700 text-lg mb-4">
            RestaurantPro es un restaurante de comida fresca y de calidad premium ubicado en el corazón de la ciudad.
            Desde nuestra fundación en 2024, nos hemos comprometido a ofrecer la mejor experiencia culinaria a nuestros clientes.
          </p>

          <h2 class="text-2xl font-bold text-primary my-6">Nuestra Misión</h2>
          <p class="text-gray-700 text-lg mb-4">
            Proporcionar comida deliciosa, saludable y de alta calidad, servida con cariño y atención al detalle.
            Creemos que cada cliente merece una experiencia memorable.
          </p>

          <h2 class="text-2xl font-bold text-primary my-6">Nuestros Valores</h2>
          <ul class="list-disc list-inside space-y-2 text-gray-700 text-lg mb-4">
            <li><strong>Calidad:</strong> Usamos solo ingredientes frescos y de primera categoría</li>
            <li><strong>Innovación:</strong> Constantemente mejoramos nuestros platos y servicios</li>
            <li><strong>Sostenibilidad:</strong> Nos preocupamos por el medio ambiente</li>
            <li><strong>Excelencia:</strong> Nuestro equipo está capacitado para brindar lo mejor</li>
          </ul>

          <h2 class="text-2xl font-bold text-primary my-6">El Equipo</h2>
          <p class="text-gray-700 text-lg">
            Nuestro equipo de chefs, cocineros y personal de servicio trabaja incansablemente para brindarte
            la mejor experiencia gastronómica. Todos están comprometidos con la excelencia y la satisfacción del cliente.
          </p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent { }
