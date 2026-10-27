---
name: refinamiento-kit
description: Revisa señales de mejora del kit, detecta repetición por fingerprint y decide si promover, descartar, fusionar, pedir evidencia o crear backlog interno. Use when el usuario pida mejorar el kit, revisar aprendizajes o procesar docs/kit-improvement/inbox.md.
---

# Refinamiento Kit

## Objetivo

Convertir señales reales del uso del kit en mejoras concretas sin inflar proceso ni contexto.

## Workflow

1. Leer `docs/kit-improvement/inbox.md`.
2. Agrupar señales por `Fingerprint`.
3. Normalizar fingerprints vacíos si el patrón es claro.
4. Contar ocurrencias y evaluar severidad.
5. Decidir por señal:
   - `descartar`
   - `observar`
   - `pedir-evidencia`
   - `fusionar`
   - `promover`
   - `backlog-interno`
6. Si se promueve, modificar el archivo mínimo necesario: agente, skill, policy, template, routing o doc.
7. Si requiere más trabajo, crear entrada en `docs/backlog-interno/mejoras.md`.
8. Registrar aprendizaje en `LESSONS.md` sólo si queda como regla activa o promovida.
9. Archivar señales cerradas en `docs/kit-improvement/archive/YYYY-MM.md`.
10. Mantener en `inbox.md` sólo señales `pendiente`, `observando` o `backlog-interno`.

## Criterio De Promoción

Promover con una sola ocurrencia sólo si:

- severidad alta o crítica;
- afecta seguridad, datos, permisos, credenciales, producción o compromiso con cliente;
- bloquea verificación o implementación.

Promover por repetición cuando:

- el mismo fingerprint tiene 2 o más ocurrencias relevantes;
- aparece en más de una feature, agente o hito;
- genera retrabajo, ambigüedad o fallas de coordinación.

No promover si:

- es preferencia puntual;
- no hay evidencia;
- ya está cubierto por una regla vigente;
- el costo de proceso supera el beneficio.

## Fingerprint

Usar claves estables y legibles:

```md
entorno.windows.spawn-eperm
backlog.refinement.missing-acceptance-criteria
mcp.permissions.unsafe-field-exposure
frontend.visual.tokens-not-applied
testing.browser.missing-negative-case
```

## Formato De Archivo

Al archivar, conservar:

```md
## Señal: título

Fingerprint:
Decisión: promovida / descartada / fusionada
Motivo:
Ocurrencias:
Archivos modificados:
Backlog interno:
Fecha:
```
