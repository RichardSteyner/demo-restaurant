#!/bin/bash

# RestaurantPro - Quick Start Script
# Este script configura e inicia la aplicación

echo "🍽️  RestaurantPro - Configuración Rápida"
echo "========================================"
echo ""

# Verificar si Node está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Por favor descárgalo de https://nodejs.org"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"
echo "✅ npm detectado: $(npm --version)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo ""
echo "========================================"
echo "✅ Configuración completada"
echo ""
echo "🚀 Para iniciar la aplicación, ejecuta:"
echo "   npm start"
echo ""
echo "📱 La aplicación estará en: http://localhost:4200"
echo ""
echo "📚 Documentación:"
echo "   - ARCHITECTURE.md       - Descripción de la arquitectura"
echo "   - DEVELOPER_GUIDE.md    - Guía para desarrolladores"
echo "   - IMPLEMENTACION_SUMMARY.md - Resumen de implementación"
echo ""
