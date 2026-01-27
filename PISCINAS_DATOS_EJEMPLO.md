# 🏊‍♀️ Datos de Piscinas para MongoDB Atlas

## 📋 Piscinas de Ejemplo para Insomnia

### Usa estos datos JSON en Insomnia para agregar piscinas a tu MongoDB Atlas:

### 1. Piscina Olímpica
```json
{
  "nombre": "Piscina Olímpica Municipal",
  "descripcion": "Piscina de 50 metros con 8 carriles profesionales, ideal para competencias y entrenamiento profesional",
  "ubicacion": "Centro Deportivo Municipal, Av. Independencia 1250",
  "precio": 75
}
```

### 2. Piscina Familiar
```json
{
  "nombre": "Aqua Family Resort",
  "descripcion": "Piscina familiar con área infantil, toboganes y zona de relax para toda la familia",
  "ubicacion": "Club Familiar Los Pinos, Zona Norte",
  "precio": 45
}
```

### 3. Piscina VIP
```json
{
  "nombre": "Infinity Pool VIP",
  "descripcion": "Piscina infinity con vista panorámica, jacuzzi privado y servicio de bar exclusivo",
  "ubicacion": "Resort Las Palmeras, Piso 15",
  "precio": 120
}
```

### 4. Piscina Terapéutica
```json
{
  "nombre": "Hydro Therapy Center",
  "descripcion": "Piscina climatizada especializada en terapia acuática y rehabilitación física",
  "ubicacion": "Centro de Salud Aquático, Zona Centro",
  "precio": 60
}
```

### 5. Piscina Semi-Olímpica
```json
{
  "nombre": "AquaSport Training",
  "descripcion": "Piscina semi-olímpica de 25 metros perfecta para entrenamiento y clases de natación",
  "ubicacion": "Complejo Deportivo AquaSport",
  "precio": 55
}
```

### 6. Piscina de Lujo
```json
{
  "nombre": "Crystal Waters Elite",
  "descripcion": "Piscina de cristal suspendida con iluminación LED y sistema de sonido subacuático",
  "ubicacion": "Hotel Boutique Crystal, Rooftop",
  "precio": 150
}
```

## 🔧 Configuración en Insomnia

### 1. Crear Colección Nueva:
- **Nombre**: "Piscinas MongoDB Atlas"

### 2. Configurar Request POST:
- **Método**: `POST`
- **URL**: `https://tu-backend-url.herokuapp.com/api/piscinas`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (JSON): Usar cualquiera de los ejemplos de arriba

### 3. Request GET para ver todas:
- **Método**: `GET`
- **URL**: `https://tu-backend-url.herokuapp.com/api/piscinas`

### 4. Request GET por ID:
- **Método**: `GET`
- **URL**: `https://tu-backend-url.herokuapp.com/api/piscinas/{id}`

### 5. Request PUT para actualizar:
- **Método**: `PUT`
- **URL**: `https://tu-backend-url.herokuapp.com/api/piscinas/{id}`
- **Body** (JSON): Datos actualizados

### 6. Request DELETE:
- **Método**: `DELETE`
- **URL**: `https://tu-backend-url.herokuapp.com/api/piscinas/{id}`

## 🎯 Ejemplo de Uso Rápido

### Para agregar todas las piscinas de una vez, ejecuta estos requests en orden:

1. **POST** - Piscina Olímpica Municipal
2. **POST** - Aqua Family Resort  
3. **POST** - Infinity Pool VIP
4. **POST** - Hydro Therapy Center
5. **POST** - AquaSport Training
6. **POST** - Crystal Waters Elite

### Verificar con GET:
```
GET https://tu-backend-url.herokuapp.com/api/piscinas
```

## 🔍 Respuesta Esperada

Después de agregar las piscinas, deberías obtener una respuesta como:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Piscina Olímpica Municipal",
    "descripcion": "Piscina de 50 metros con 8 carriles profesionales...",
    "ubicacion": "Centro Deportivo Municipal, Av. Independencia 1250",
    "precio": 75,
    "createdAt": "2026-01-27T15:30:00Z",
    "updatedAt": "2026-01-27T15:30:00Z"
  },
  // ... más piscinas
]
```

## ✅ Verificación en la App

Una vez agregadas las piscinas en MongoDB Atlas:

1. Ve a: **http://localhost:5175/piscinas**
2. Deberías ver las 6 piscinas listadas
3. Cada piscina mostrará su ID de MongoDB (`_id`)
4. Puedes agregar piscinas al carrito si estás autenticado

---
**¡Listo para probar con datos reales de MongoDB Atlas!** 🚀