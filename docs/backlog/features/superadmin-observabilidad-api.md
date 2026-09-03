# Feature: Superadmin Y Observabilidad De La API

Tipo: AFK
Estado: implementada y operativa para la revisión interna de consultas
Hito: mejora continua de referencias de mercado
Bloqueado por: SMTP real depende de configuración por entorno; no bloquea la observabilidad

## Valor De Negocio

Permite que Algorym supervise la integración y convierta consultas reales en evidencia para mejorar el matching, sin sumar fricción a Venturino ni trabajo obligatorio a Padawanway.

## Qué Construir

- acceso superadmin por credenciales separadas;
- autorización server-side;
- auditoría ampliada;
- panel y explorador de consultas;
- revisión interna;
- alertas SMTP accionables.

## Dependencias

- Datos: PostgreSQL + Prisma.
- Backend: route handlers y servicios Next.js.
- Frontend: UI actual Venturino/John Deere.
- Permisos: `SUPERADMIN` firmado en sesión.
- MCP/IA: contrato-candidato.

## Criterios De Aceptación

- [x] No cambia el acceso de Venturino.
- [x] No cambia el contrato Padawanway.
- [x] Superadmin queda oculto y protegido.
- [x] Auditoría y revisión quedan persistidas.
- [x] Alertas son asíncronas respecto del request de negocio.
- [x] Listado paginado y filtrado en servidor.

## MCP/IA

- Estado MCP: contrato-candidato.
- Herramientas afectadas: resumen, listado y revisión de consultas.
- Coverage map actualizado: sí.

## Verificación

- Nivel esperado: 4.
- Navegador requerido: sí, en el entorno local del usuario.
- Tests y comandos: documentados en el cambio procesado.

## Entorno

- Variables requeridas: credenciales superadmin y, para alertas, SMTP.
- Fallback permitido: alertas deshabilitadas; el superadmin de consultas sigue operativo.
- Estado: panel, auditoría y revisión operativos; el envío SMTP se verifica sólo con credenciales válidas del entorno.
