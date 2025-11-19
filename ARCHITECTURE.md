# RestaurantPro - Aplicación Web de Restaurante en Angular

Una aplicación web moderna y escalable para restaurantes construida con Angular 17, Tailwind CSS y arquitectura modular.

## 📋 Características

✅ **Arquitectura Modular y Escalable**

- Componentes reutilizables y livianos
- Uso de OnPush Change Detection
- Organización por features (Menu, Cart, Order)
- Servicios encapsulados para lógica de negocio

✅ **Funcionalidades Principales**

- Catálogo de productos con categorías
- Carrito de compras persistente (localStorage)
- Proceso de checkout
- Gestión de órdenes
- Sistema de navegación completo

✅ **Diseño Responsivo**

- Tailwind CSS para estilos
- Diseño Mobile-First
- Interfaces intuitivas y amigables

✅ **Datos Locales**

- JSON para categorías y productos
- Almacenamiento en localStorage
- Fácil de extender a un backend

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                      # Servicios y modelos principales
│   │   ├── models.ts             # Interfaces TypeScript
│   │   ├── menu.service.ts        # Servicio de menú
│   │   ├── cart.service.ts        # Servicio de carrito
│   │   └── order.service.ts       # Servicio de órdenes
│   │
│   ├── shared/                    # Componentes y utilidades compartidas
│   │   ├── components/
│   │   │   ├── header.component.ts
│   │   │   ├── footer.component.ts
│   │   │   ├── product-card.component.ts
│   │   │   └── hero.component.ts
│   │   ├── pipes/                # Pipes personalizadas
│   │   └── directives/           # Directivas personalizadas
│   │
│   ├── features/                  # Módulos de características
│   │   ├── home/
│   │   │   └── home.component.ts
│   │   ├── menu/
│   │   │   └── menu.component.ts
│   │   ├── cart/
│   │   │   └── cart.component.ts
│   │   ├── order/
│   │   │   └── checkout.component.ts
│   │   ├── about/
│   │   │   └── about.component.ts
│   │   └── contact/
│   │       └── contact.component.ts
│   │
│   ├── app.routes.ts             # Configuración de rutas
│   ├── app.config.ts             # Configuración de aplicación
│   └── app.component.ts          # Componente raíz
│
├── assets/
│   └── data/
│       ├── categories.json        # Datos de categorías
│       └── products.json          # Datos de productos
│
├── styles.css                      # Estilos globales con Tailwind
└── main.ts                         # Punto de entrada
```

## 🎨 Componentes Principales

### `app-header`

Encabezado con navegación, logo y carrito.

- Navegación responsive
- Contador de items del carrito en tiempo real
- Menú móvil

### `app-hero`

Banner de bienvenida con CTA.

- Gradiente atractivo
- Llamada a la acción

### `app-product-card`

Tarjeta reutilizable para productos.

- Imagen del producto
- Rating y precio
- Botón de agregar al carrito

### `app-footer`

Pie de página con información de contacto.

- Enlaces rápidos
- Información de contacto
- Redes sociales

## 🔧 Servicios

### `MenuService`

Gestiona categorías y productos.

```typescript
- getCategories(): Observable<Category[]>
- getProducts(): Observable<Product[]>
- getProductsByCategory(categoryId): Observable<Product[]>
- getProductById(id): Observable<Product>
```

### `CartService`

Gestiona el carrito de compras.

```typescript
- addToCart(product, quantity): void
- removeFromCart(productId): void
- updateQuantity(productId, quantity): void
- clearCart(): void
- getCartTotal(): Observable<number>
- getCartItemsCount(): Observable<number>
- getCartItems(): Observable<CartItem[]>
```

### `OrderService`

Gestiona las órdenes.

```typescript
- createOrder(...): Order
- getOrders(): Observable<Order[]>
- getOrderById(id): Observable<Order>
- updateOrderStatus(orderId, status): void
```

## 📍 Rutas

| Ruta        | Componente        | Descripción           |
| ----------- | ----------------- | --------------------- |
| `/`         | HomeComponent     | Página de inicio      |
| `/menu`     | MenuComponent     | Catálogo de productos |
| `/cart`     | CartComponent     | Carrito de compras    |
| `/checkout` | CheckoutComponent | Proceso de pedido     |
| `/about`    | AboutComponent    | Acerca de nosotros    |
| `/contact`  | ContactComponent  | Contacto              |

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Desarrollo

```bash
# Inicia servidor de desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### Build para producción

```bash
npm run build
```

## 🎯 Modelos de Datos

```typescript
interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  description: string;
  image: string;
  rating: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
}
```

## 🔌 Extensiones Futuras

- [ ] Integración con backend API
- [ ] Autenticación de usuarios
- [ ] Sistema de reseñas y ratings
- [ ] Búsqueda y filtrado avanzado
- [ ] Múltiples métodos de pago
- [ ] Panel de administración
- [ ] Historial de órdenes del usuario
- [ ] Promociones y cupones descuento
- [ ] Integración con Google Maps
- [ ] Notificaciones push

## 📦 Dependencias Principales

- **Angular 17**: Framework principal
- **Tailwind CSS**: Estilos y responsive design
- **TypeScript**: Lenguaje tipado
- **RxJS**: Programación reactiva

## 🎨 Personalización

### Colores personalizados (tailwind.config.js)

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1F2937',      // Gris oscuro
      secondary: '#F97316',    // Naranja
      accent: '#10B981',       // Verde
    }
  }
}
```

## ✨ Buenas Prácticas Implementadas

✅ **Componentes livianos** con OnPush Change Detection
✅ **Inyección de dependencias** correcta
✅ **Servicios reutilizables** con RxJS
✅ **Componentes standalone** (Angular 14+)
✅ **Routing lazy loading ready**
✅ **LocalStorage** para persistencia
✅ **Responsive design** con Tailwind
✅ **TypeScript strict mode**
✅ **Composición sobre herencia**

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

**RestaurantPro** - Potenciando experiencias culinarias digitales 🍽️
