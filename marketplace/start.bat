@echo off
echo ========================================
echo    GameStore Marketplace - Inicio
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado.
    echo Por favor instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Navegando al directorio backend...
cd backend

echo Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: No se pudieron instalar las dependencias.
        pause
        exit /b 1
    )
) else (
    echo Dependencias ya instaladas.
)

echo.
echo ========================================
echo  Iniciando servidor de la API...
echo  URL: http://localhost:3000
echo ========================================
echo.
echo Para probar la API:
echo 1. Abre Postman
echo 2. Importa: GameStore_Postman_Collection.json
echo 3. Abre index.html en tu navegador
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

npm start