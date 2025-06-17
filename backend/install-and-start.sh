#!/bin/bash

echo "🚀 Instalando dependencias del backend..."
npm install --legacy-peer-deps

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencias instaladas correctamente!"
    echo "🔄 Iniciando el servidor backend en modo desarrollo..."
    echo ""
    echo "📡 El backend estará disponible en: http://localhost:3001"
    echo "🛑 Para detener el servidor, presiona Ctrl+C"
    echo ""
    
    npm run start:dev
else
    echo ""
    echo "❌ Error al instalar dependencias. Intenta ejecutar:"
    echo "   npm install --legacy-peer-deps"
    echo ""
fi 