# Conexión con Backend - Documentación

## Configuración Completada

### 1. Configuración de Axios
- **Archivo**: `src/config/axios.js`
- **Base URL**: Configurada para `http://localhost:3003` o `VITE_APP_BASE_API`
- **Interceptores**: Configurados para enviar automáticamente el token JWT en las peticiones

### 2. Context API Actualizado
- **PiscinaState**: Completamente conectado con el backend
- **PiscinaReducer**: Maneja estados de loading, error y operaciones CRUD

### 3. Endpoints del Backend Esperados

#### GET /api/piscinas
- **Descripción**: Obtener todas las piscinas
- **Respuesta esperada**:
```json
[
  {
    "id": 1,
    "nombre": "Piscina Olimpica",
    "descripcion": "Descripción de la piscina",
    "ubicacion": "Ubicación",
    "precio": 50
  }
]
```

#### POST /api/piscinas
- **Descripción**: Crear nueva piscina
- **Body**:
```json
{
  "nombre": "Nombre de la piscina",
  "descripcion": "Descripción",
  "ubicacion": "Ubicación",
  "precio": 50
}
```

#### PUT /api/piscinas/:id
- **Descripción**: Actualizar piscina existente
- **Body**: Mismo formato que POST

#### DELETE /api/piscinas/:id
- **Descripción**: Eliminar piscina por ID

#### GET /api/piscinas/:id
- **Descripción**: Obtener piscina específica por ID

### 4. Funcionalidades Implementadas

#### Para Usuarios Regulares:
- Ver lista de piscinas desde el backend
- Manejo de estados de carga y error
- Fallback a datos locales si el backend no responde
- Agregar piscinas al carrito

#### Para Administradores:
- Panel de administración completo (`/admin/piscinas`)
- Crear nuevas piscinas
- Editar piscinas existentes
- Eliminar piscinas
- Interfaz responsive y amigable

### 5. Estados Manejados
- `loading`: Indica si hay operaciones en curso
- `error`: Mensajes de error del backend
- `piscinas`: Array de piscinas
- `piscinaSeleccionada`: Piscina específica seleccionada

### 6. Autenticación
- Token JWT se envía automáticamente en las peticiones
- Funciones de auth en `src/utils/auth.js`
- Manejo de usuarios y roles

### 7. Manejo de Errores
- Retry automático en caso de fallos
- Mensajes de error user-friendly
- Fallback a datos locales
- Indicadores visuales de estado

## Uso en Componentes

### Obtener piscinas:
```jsx
const { piscinas, loading, error, getPiscinas } = useContext(PiscinaContext);

useEffect(() => {
  getPiscinas();
}, []);
```

### Agregar piscina (Admin):
```jsx
const { agregarPiscina } = useContext(PiscinaContext);

const nuevaPiscina = {
  nombre: "Mi Piscina",
  descripcion: "Descripción",
  ubicacion: "Ubicación", 
  precio: 100
};

const result = await agregarPiscina(nuevaPiscina);
if (result.success) {
  // Éxito
} else {
  // Error: result.error
}
```

### Actualizar piscina:
```jsx
const { actualizarPiscina } = useContext(PiscinaContext);

const result = await actualizarPiscina(id, datosActualizados);
```

### Eliminar piscina:
```jsx
const { eliminarPiscina } = useContext(PiscinaContext);

const result = await eliminarPiscina(id);
```

## Notas Importantes

1. **Fallback**: Si el backend no está disponible, la aplicación funciona con datos locales
2. **Roles**: Solo los usuarios con `role: 'admin'` pueden acceder al panel de administración
3. **Validación**: Formularios tienen validación del lado cliente
4. **UX**: Estados de loading y error proporcionan feedback al usuario
5. **Responsive**: Interfaz adaptable a diferentes tamaños de pantalla

## Backend Requerido

Para que funcione completamente, necesitas un backend que:
- Corra en `http://localhost:3003`
- Implemente los endpoints mencionados
- Maneje autenticación JWT
- Responda con el formato JSON esperado

Si no tienes backend, la aplicación funcionará con datos de prueba locales.