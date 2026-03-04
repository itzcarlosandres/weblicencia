# WebLicencia - Plataforma Premium de Venta de Licencias 🎯

Una plataforma profesional Full Stack para vender licencias de software, códigos digitales, y gift cards. Inspirada en G2A, Eneba y Kinguin.

## 🌟 Características Principales

- ✅ **Next.js 14+ con App Router** - Última tecnología de React
- ✅ **PostgreSQL + Prisma ORM** - Base de datos robusta
- ✅ **NextAuth con JWT** - Autenticación segura
- ✅ **Stripe + PayPal** - Múltiples métodos de pago
- ✅ **Entrega Automática de Claves** - Sistema de liberación instantánea
- ✅ **Panel Admin Completo** - CRUD de productos y gestión
- ✅ **Diseño Premium con TailwindCSS + Shadcn/UI** - UI moderna y limpia
- ✅ **Docker Ready** - Deployment listo para Easypanel
- ✅ **Sistema Antifraude** - Protección básica
- ✅ **SEO Optimizado** - Metadatos dinámicos

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Shadcn/UI
- **Backend**: API Routes, Server Actions
- **Base de datos**: PostgreSQL 16, Prisma ORM
- **Autenticación**: NextAuth v4, JWT
- **Pagos**: Stripe, PayPal
- **Deployment**: Docker, Docker Compose
- **Security**: bcrypt, HTTPS/TLS

## 📋 Requisitos Previos

- Node.js >= 18.17.0
- npm / pnpm / yarn
- PostgreSQL 14+ (o Docker)
- Git

## 🛠️ Instalación Local

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd weblicencia
```

### 2. Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
DATABASE_URL="postgresql://weblicencia:weblicencia@localhost:5432/weblicencia"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
STRIPE_PUBLIC_KEY="pk_test_your_key"
STRIPE_SECRET_KEY="sk_test_your_key"
PAYPAL_CLIENT_ID="test_client_id"
PAYPAL_CLIENT_SECRET="test_client_secret"
```

### 4. Base de datos

```bash
# Ejecutar migraciones
npx prisma migrate dev --name init

# Opcional: Abrir Prisma Studio
npx prisma studio
```

### 5. Crear usuario admin (Seed)

```bash
npx prisma db seed
```

Si deseas crear el script seed, crea `prisma/seed.ts` con:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Crear usuario admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@weblicencia.com' },
    update: {},
    create: {
      email: 'admin@weblicencia.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 6. Ejecutar en desarrollo

```bash
npm run dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🐳 Con Docker

### Levantar con Docker Compose

```bash
docker compose up --build -d
```

Servicios:
- **App**: http://localhost:3000
- **PostgreSQL**: localhost:5432

### Ejecutar migraciones en Docker

```bash
docker compose exec app npx prisma migrate deploy
```

### Detener servicios

```bash
docker compose down
```

## 📦 Build para Producción

### Build local

```bash
npm run build
npm start
```

### Build Docker

```bash
docker build -t weblicencia:latest .
docker run -p 3000:3000 weblicencia:latest
```

## 🚀 Deployment en Easypanel

### Pasos

1. **Subir a repositorio Git**
   ```bash
   git push origin main
   ```

2. **En Easypanel**:
   - Selecciona "New Service" → "Docker Compose"
   - Conecta tu repositorio Git
   - Configura las siguientes variables:

   ```env
   DATABASE_URL=postgresql://user:pass@postgres:5432/weblicencia
   NEXTAUTH_URL=https://tu-dominio.com
   NEXTAUTH_SECRET=<generar-con-openssl>
   STRIPE_SECRET_KEY=sk_live_xxxxx
   PAYPAL_CLIENT_ID=xxxxx
   ```

3. **Configurar Puerto**:
   - Puerto expuesto: `3000`
   - Certificado SSL: Automático (Let's Encrypt)

4. **Desplegar**:
   - Click en "Deploy"
   - Easypanel construirá y deployará automáticamente

## 🔐 Configurar Stripe (Producción)

### En Dashboard de Stripe

1. Ir a **Webhooks**
2. Agregar Endpoint:
   - URL: `https://tu-dominio.com/api/webhooks/stripe`
   - Eventos: `payment_intent.succeeded`, `charge.failed`
3. Copiar **Signing Secret**
4. Actualizar `STRIPE_WEBHOOK_SECRET` en variables de entorno

## 💳 Configurar PayPal (Producción)

### En Dashboard de PayPal

1. Ir a **Webhooks** en Sandbox/Production
2. Crear Webhook:
   - URL: `https://tu-dominio.com/api/webhooks/paypal`
   - Eventos: `CHECKOUT.ORDER.COMPLETED`, `PAYMENT.CAPTURE.COMPLETED`
3. Copiar **Webhook ID**
4. Actualizar `PAYPAL_WEBHOOK_ID` y cambiar `PAYPAL_MODE` a `live`

## 📁 Estructura del Proyecto

```
weblicencia/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth pages
│   │   ├── admin/                    # Admin panel
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   └── webhooks/             # Stripe, PayPal
│   │   ├── dashboard/                # User dashboard
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home
│   ├── components/
│   │   ├── ui/                       # Shadcn components
│   │   ├── sections/                 # Home sections
│   │   └── auth/                     # Auth forms
│   ├── lib/
│   │   ├── prisma.ts                 # Prisma client
│   │   └── utils.ts                  # Utilities
│   ├── styles/
│   │   └── globals.css               # Tailwind CSS
│   └── auth.ts                       # NextAuth config
├── prisma/
│   └── schema.prisma                 # DB Schema
├── public/                           # Static files
├── docker-compose.yml                # Docker Compose
├── Dockerfile                        # Docker image
├── tailwind.config.ts                # Tailwind config
├── next.config.js                    # Next.js config
├── tsconfig.json                     # TypeScript config
├── .env.example                      # Env template
└── package.json                      # Dependencies
```

## 🧪 Testing

### Stripe Test Cards

```
4242 4242 4242 4242 - Visa Success
4000 0000 0000 0002 - Visa Decline
```

### PayPal Sandbox

- Email: sb-test@emailfortest.com
- Password: `12345678`

## 📊 Base de Datos - Modelos

### User
- id (PK)
- email (UNIQUE)
- name
- password (hash)
- role (ADMIN, CUSTOMER)

### Product
- id (PK)
- title
- slug (UNIQUE)
- description
- price
- category
- stock
- image
- active

### LicenseKey
- id (PK)
- key (UNIQUE)
- status (AVAILABLE, SOLD, REVOKED)
- productId (FK)
- orderId (FK)

### Order
- id (PK)
- userId (FK)
- total
- status (PENDING, PAID, FAILED)
- paymentMethod (stripe, paypal)
- paymentId

### OrderItem
- id (PK)
- orderId (FK)
- productId (FK)
- price
- quantity

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT para sesiones
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ SQL Injection prevention (Prisma)
- ✅ XSS protection
- ✅ Validación de datos backend
- ✅ Verificación de webhooks

## 🎨 Temas

El proyecto soporta modo claro/oscuro automáticamente.

Para forzar un tema:

```typescript
// En el cliente
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
    Toggle Theme
  </button>
}
```

## 📈 Optimización

- **Lighthouse Score**: 90+
- **Core Web Vitals**: Optimizadas
- **Image Optimization**: Next.js Image
- **Code Splitting**: Automático
- **CSS Purging**: TailwindCSS
- **Database Indexing**: Prisma

## 🐛 Troubleshooting

### Error: "NEXTAUTH_SECRET is not set"
```bash
export NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### Error: "Can't reach database"
```bash
# Verificar conexión
docker compose logs postgres

# Ejecutar migraciones
docker compose exec app npx prisma migrate deploy
```

### Error: "Webhook signature verification failed"
- Verificar que `STRIPE_WEBHOOK_SECRET` es correcto
- En desarrollo, usar `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## 📞 Soporte

Para reportar bugs o sugerencias, abre un issue en el repositorio.

## 📄 Licencia

MIT License - Puedes usar este código libremente en proyectos comerciales.

## 🙏 Créditos

Diseño inspirado en:
- G2A
- Eneba
- Kinguin
- Shadcn/UI

---

**Happy Coding! 🚀**
