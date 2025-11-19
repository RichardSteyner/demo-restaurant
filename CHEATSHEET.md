# ⚡ RestaurantPro - Cheatsheet Rápido

## 🚀 Comandos Esenciales

```bash
# Instalación
npm install
npm start

# Build
npm run build

# Testing
npm run test

# Limpiar
npm run clean  # (si existe)
```

## 📁 Crear Nuevos Archivos

### Nuevo Componente

```bash
# Manualmente crear:
# src/app/shared/components/nombre/
# ├── nombre.component.ts
# ├── nombre.component.html
# └── nombre.component.css
```

### Template Básico de Componente

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-nombre",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./nombre.component.html",
  styleUrls: ["./nombre.component.css"],
})
export class NombreComponent {}
```

### Nuevo Servicio

```typescript
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MiServicio {
  constructor() {}
}
```

## 🎨 Clases Tailwind Frecuentes

### Layout

```html
<!-- Container -->
<div class="container mx-auto px-4">
  <!-- Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Flexbox -->
    <div class="flex justify-between items-center">
      <!-- Espaciado -->
      <div class="m-4 p-6 mb-8 pb-12">
        <!-- Display -->
        <div class="hidden md:block">
          <!-- Mostrar solo desktop -->
          <div class="block md:hidden"><!-- Mostrar solo móvil --></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Tipografía

```html
<!-- Tamaños -->
<h1 class="text-4xl">Título grande</h1>
<h2 class="text-2xl">Subtítulo</h2>
<p class="text-base">Párrafo normal</p>
<span class="text-sm">Texto pequeño</span>

<!-- Estilos -->
<p class="font-bold">Negrita</p>
<p class="font-semibold">Semi negrita</p>
<p class="text-gray-600">Gris</p>
<p class="text-primary">Color primario</p>
```

### Colores

```html
<!-- Background -->
<div class="bg-primary">
  <!-- #1F2937 -->
  <div class="bg-secondary">
    <!-- #F97316 -->
    <div class="bg-gray-100">
      <!-- Text -->
      <p class="text-primary"></p>
      <p class="text-white"></p>
      <p class="text-gray-600">
        <!-- Borders -->
      </p>

      <div class="border border-gray-300"></div>
    </div>
  </div>
</div>
```

### Componentes Comunes

```html
<!-- Botones -->
<button class="btn-primary">Primario</button>
<button class="btn-secondary">Secundario</button>

<!-- Cards -->
<div class="bg-white rounded-lg shadow-lg p-6">
  <!-- Forms -->
  <input class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
  <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>

  <!-- Alerts -->
  <div class="bg-green-100 text-green-800 p-4 rounded">Éxito</div>
  <div class="bg-red-100 text-red-800 p-4 rounded">Error</div>
</div>
```

## 📊 Usando Servicios

### Inyectar en Componente

```typescript
constructor(private miServicio: MiServicio) {}

ngOnInit() {
  this.miServicio.datos$.subscribe(datos => {
    console.log(datos);
  });
}
```

### Template (Async Pipe)

```html
<div *ngIf="miServicio.datos$ | async as datos">{{ datos.nombre }}</div>

<div *ngFor="let item of (miServicio.items$ | async)">{{ item.name }}</div>
```

## 🎯 Servicios Disponibles

### MenuService

```typescript
// En componente
constructor(private menu: MenuService) {
  this.menu.getCategories();
  this.menu.getProducts();
  this.menu.getProductsByCategory(1);
  this.menu.getProductById(5);
}
```

### CartService

```typescript
constructor(private cart: CartService) {
  this.cart.addToCart(product, 2);
  this.cart.removeFromCart(productId);
  this.cart.updateQuantity(productId, 3);
  this.cart.getCartTotal();
  this.cart.getCartItemsCount();
}
```

### OrderService

```typescript
constructor(private order: OrderService) {
  this.order.createOrder(items, total, name, email, phone);
  this.order.getOrders();
  this.order.getOrderById(123);
  this.order.updateOrderStatus(123, 'confirmed');
}
```

## 🔄 Rutas

### Navegar

```typescript
// En componente
constructor(private router: Router) {}

navigateTo() {
  this.router.navigate(['/menu']);
  this.router.navigate(['/cart']);
  this.router.navigate(['/checkout']);
}
```

### Template

```html
<a routerLink="/">Inicio</a>
<a routerLink="/menu">Menú</a>
<a routerLink="/cart">Carrito</a>
<a routerLink="/checkout">Pagar</a>

<!-- Active class -->
<a routerLink="/menu" routerLinkActive="text-secondary">Menú</a>
```

## 💾 LocalStorage

```typescript
// Guardar
localStorage.setItem("cart", JSON.stringify(data));

// Obtener
const data = JSON.parse(localStorage.getItem("cart") || "[]");

// Eliminar
localStorage.removeItem("cart");

// El CartService lo hace automáticamente
```

## 🧪 Console Útil

```typescript
// Debug
console.log("Datos:", datos);
console.table(array); // Tabla formateada
console.time("nombre"); // Medir tiempo
console.timeEnd("nombre");

// Warnings
console.warn("Cuidado:", valor);
console.error("Error:", error);
```

## 📱 Responsive Breakpoints

```
Tailwind Breakpoints:
- sm: 640px
- md: 768px    ← Tablet
- lg: 1024px   ← Desktop
- xl: 1280px   ← Grande
- 2xl: 1536px  ← Muy grande

Uso:
<div class="text-sm md:text-base lg:text-lg">
  Responsivo
</div>
```

## 🎨 Componentes Reutilizables

### ProductCard

```html
<app-product-card [product]="product" (addToCart)="onAddToCart($event)"> </app-product-card>
```

### Header

```html
<app-header></app-header>
<!-- Automaticamente muestra el contador del carrito -->
```

### Footer

```html
<app-footer></app-footer>
```

### Hero

```html
<app-hero></app-hero>
```

## 🔍 Búsqueda de Referencias

```bash
# Buscar dónde se usa un servicio/componente
# En VS Code: Ctrl+Shift+H (Find in Files)
# Buscar: MenuService, CartService, etc.
```

## 📝 Checklist para Nueva Funcionalidad

- [ ] ¿Necesito un nuevo componente?

  - [ ] Crear en carpeta correcta (shared/ o features/)
  - [ ] Hacer standalone
  - [ ] Agregar OnPush
  - [ ] Crear HTML y CSS

- [ ] ¿Necesito nueva ruta?

  - [ ] Agregar en app.routes.ts
  - [ ] Agregar link en header si es necesario

- [ ] ¿Necesito un servicio?

  - [ ] Crear en core/
  - [ ] Agregar providedIn: 'root'
  - [ ] Usar BehaviorSubject para estado

- [ ] ¿Necesito datos?
  - [ ] Crear archivo JSON en assets/data/
  - [ ] Crear interfaz en core/models.ts
  - [ ] Cargar en el servicio

## 🚨 Errores Comunes

```
Error: Cannot find module 'path/to/file'
→ Revisar ruta exacta, import case-sensitive

Error: X is not a known element
→ Importar componente en imports: []

Error: Can't bind to 'ngIf' since it isn't a known property
→ Importar CommonModule

Error: No provider for MiServicio
→ Asegurar providedIn: 'root' en @Injectable
```

## 🎯 URLs Importantes

- [Angular Docs](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org)

---

**¡Feliz coding!** 🚀

_Última actualización: Noviembre 2024_
