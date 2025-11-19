# Guía de Desarrollo - RestaurantPro

## 🚀 Cómo Comenzar

### Prerrequisitos

- Node.js v18+
- Angular CLI v17+
- Git

### Instalación Inicial

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd poc-restaurant

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm start

# 4. Abrir navegador en http://localhost:4200
```

## 📝 Crear Nuevos Componentes

### Componente Standalone (Recomendado)

```typescript
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-mi-componente",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./mi-componente.component.html",
  styleUrls: ["./mi-componente.component.css"],
})
export class MiComponenteComponent {
  // Lógica del componente
}
```

### Ubicación de Componentes

- **Compartidos**: `src/app/shared/components/`
- **Features**: `src/app/features/<feature-name>/`

## 📡 Crear Nuevos Servicios

```typescript
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MiServicio {
  private dataSubject = new BehaviorSubject<TipoDato[]>([]);

  constructor() {
    // Inicializar datos
  }

  getData(): Observable<TipoDato[]> {
    return this.dataSubject.asObservable();
  }
}
```

## 🛣️ Agregar Nuevas Rutas

En `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  {
    path: "mi-ruta",
    component: MiComponenteComponent,
  },
  // ...
];
```

## 🎨 Usar Tailwind CSS

### Clases Comunes

```html
<!-- Colores -->
<div class="bg-primary text-white">Fondo primario</div>
<div class="bg-secondary">Fondo secundario</div>

<!-- Layout -->
<div class="container mx-auto px-4">Contenedor</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">Grid responsive</div>

<!-- Botones (custom) -->
<button class="btn-primary">Botón primario</button>
<button class="btn-secondary">Botón secundario</button>

<!-- Espaciado -->
<div class="mb-4 p-6">Margen y padding</div>

<!-- Responsive -->
<div class="hidden md:block">Solo en desktop</div>
<div class="block md:hidden">Solo en móvil</div>
```

## 💾 Trabajar con Datos JSON

### Agregar nuevos datos

1. Crear archivo en `src/assets/data/`:

```json
[
  { "id": 1, "nombre": "Elemento 1" },
  { "id": 2, "nombre": "Elemento 2" }
]
```

2. Crear modelo en `src/app/core/models.ts`:

```typescript
export interface MiModelo {
  id: number;
  nombre: string;
}
```

3. Crear servicio para cargar datos:

```typescript
constructor(private http: HttpClient) {
  this.http.get<MiModelo[]>('assets/data/mi-archivo.json')
    .subscribe(data => {
      // Procesar datos
    });
}
```

## 🔄 Trabajar con RxJS Observables

```typescript
// Suscribirse en template (automático)
{{ miObservable$ | async }}

// Suscribirse en componente
ngOnInit() {
  this.miServicio.datos$.subscribe(datos => {
    console.log(datos);
  });
}

// Combinar múltiples observables
combineLatest([
  this.servicio1.datos$,
  this.servicio2.datos$
]).subscribe(([datos1, datos2]) => {
  // Usar ambos datos
});
```

## 📱 Hacer Componentes Responsive

```html
<!-- Ejemplo: Grid que se adapta -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Items -->
</div>

<!-- Ejemplo: Menú responsivo -->
<nav class="hidden md:flex">
  <!-- Navegación desktop -->
</nav>
<button class="md:hidden">Menú móvil</button>
```

## 🧪 Verificar Cambios

```bash
# Compilar y verificar errores
npm run build

# Ejecutar tests (si hay)
npm run test

# Ver la aplicación en desarrollo
npm start
```

## 📦 Estructura de Features

Cada feature debe tener:

```
features/
└── mi-feature/
    ├── mi-feature.component.ts
    ├── mi-feature.component.html
    ├── mi-feature.component.css
    └── subcomponents/
        └── subcomponente.component.ts
```

## 🎯 Conveñciones de Código

### Nombres

- Componentes: `mi-componente.component.ts`
- Servicios: `mi.service.ts`
- Modelos/Interfaces: `models.ts`

### Variables

- Observables terminan con `$`: `datos$`
- Subjects privados: `private dataSubject`
- Propiedades públicas en Input/Output

### Métodos

- Métodos que retornan Observables
- Métodos privados con `private`
- Métodos de clase con nomenclatura camelCase

## 🐛 Debugging

### Console

```typescript
console.log("Debug:", datos);
console.warn("Advertencia");
console.error("Error:", error);
```

### DevTools de Angular

1. Instalar extension de Chrome: [Angular DevTools](https://chrome.google.com/webstore)
2. Abrir DevTools (F12)
3. Ir a tab "Angular"

### Ver estado de servicios

```typescript
// En cualquier componente
constructor(private miServicio: MiServicio) {
  this.miServicio.datos$.subscribe(d => console.log(d));
}
```

## 📚 Recursos Útiles

- [Documentación Angular](https://angular.dev)
- [Documentación Tailwind CSS](https://tailwindcss.com)
- [RxJS Operators](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✅ Checklist para Nueva Feature

- [ ] Crear estructura de carpetas
- [ ] Crear componentes necesarios
- [ ] Crear servicio si requiere
- [ ] Agregar modelos en `models.ts`
- [ ] Agregar rutas en `app.routes.ts`
- [ ] Implementar HTML y CSS
- [ ] Probar en desarrollo (`npm start`)
- [ ] Verificar build (`npm run build`)

## 🚀 Deployment

```bash
# Build para producción
npm run build

# Archivos en: dist/poc-restaurant/

# Deploy a servidor (ejemplo: Netlify, Vercel, etc.)
# Seguir instrucciones del proveedor
```

---

**Happy Coding! 🎉**
