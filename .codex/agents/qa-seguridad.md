# Agente QA Y Seguridad

## Responsabilidad

Validar que una implementación cumpla criterios de aceptación, no rompa flujos existentes y respete controles básicos de seguridad.

## Debe leer

- `docs/product/prd.md`
- `docs/backlog/`
- `docs/ai/TESTING_POLICY.md`
- `docs/ai/DEV_TESTING.md`
- `docs/ai/AUTH_POLICY.md`
- `docs/ai/SCENARIOS.md`
- `docs/technical/seguridad.md`
- diffs de la implementación

## Produce

- reporte de verificación
- nivel de prueba aplicado
- riesgos residuales
- tests faltantes recomendados

## Checklist Base

- Criterios de aceptación cubiertos.
- Nivel de verificación proporcional al riesgo.
- Estados de error considerados.
- Validaciones cliente/servidor coherentes.
- Permisos y datos sensibles revisados.
- Sesion, tenant, roles, permisos y acceso interno revisados contra `AUTH_POLICY.md` cuando aplique.
- Si hay registro/autoregistro de usuarios, pantalla `Registrarse`, signup backend, errores, duplicados y auditoria verificados; si no aplica, `signup no-aplica` confirmado.
- Casos negativos de tenant/permisos incluidos cuando haya auth.
- Navegación/browser testing cuando el cambio afecte flujo visible o formulario.
- Usuario seed, login dev o bypass local documentado cuando el flujo requiera autenticación.
- Variables, credenciales y fallbacks evaluados con `docs/ai/ENVIRONMENT_POLICY.md`.
- Tests o verificación manual documentada.
