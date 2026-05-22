# Agent Framework Policy

## Objetivo

Definir cuando usar LangGraph, LangChain o una implementacion simple para agentes IA del sistema.

Esta politica aplica a agentes separados del MCP, por ejemplo Telegram, WhatsApp, asistentes internos o automatizaciones conversacionales.

## Regla Base

- LangGraph es el framework recomendado para agentes IA no triviales.
- LangChain es una capa util opcional para modelos, prompts, parsers, retrievers, tool wrappers e integraciones.
- Ninguno de los dos es obligatorio para agentes simples.
- El MCP sigue siendo la frontera operativa: el agente invoca herramientas MCP y no accede directo a la DB operativa.

## Usar LangGraph Cuando

Usar LangGraph como default si el agente necesita al menos uno de estos puntos:

- estado conversacional persistente o recuperable;
- varios pasos antes de responder;
- decisiones condicionales;
- multiples herramientas MCP;
- aprobacion humana o confirmacion antes de ejecutar;
- retries, fallback o recuperacion de errores;
- memoria, resumen o contexto incremental;
- auditoria de pasos;
- flujos que puedan crecer por canal, rol o permiso.

## Usar LangChain Cuando

Usar LangChain como apoyo si aporta valor concreto para:

- clientes de modelos;
- templates de prompts;
- output parsers;
- tool wrappers;
- retrievers;
- integraciones con proveedores;
- evaluaciones o trazas compatibles con el stack.

No usar LangChain solo por costumbre si FastAPI, modelos tipados y cliente MCP resuelven el caso de forma mas clara.

## No Usar LangGraph Cuando

Preferir implementacion simple si el agente es lineal:

- webhook recibe evento;
- valida usuario/canal;
- llama una herramienta MCP;
- devuelve una respuesta;
- no necesita estado complejo, branching ni memoria.

Ejemplos:

- comando `/stock sku-123`;
- consulta simple de estado;
- notificacion saliente sin dialogo;
- automatizacion cron que llama una tool MCP y reporta resultado.

## Arquitectura Recomendada Con LangGraph

```text
services/
  telegram-agent/
    app/
      main.py
      graph/
        state.py
        nodes.py
        edges.py
        graph.py
      channels/
      mcp_client/
      skills/
      prompts/
      policies/
      models/
    tests/
```

## Reglas De Implementacion

- Definir schema de estado explicito.
- Cada nodo debe representar una decision o accion clara.
- Evitar nodos gigantes que mezclen canal, permisos, prompts y llamadas MCP.
- Las tools del agente deben ser wrappers tipados sobre herramientas MCP.
- Las confirmaciones sensibles deben ser nodos o pasos visibles del grafo.
- Registrar pasos relevantes para auditoria.
- Tests minimos: seleccion de tool, branching, permiso denegado, confirmacion, error MCP y reintento si aplica.

## Decision Requerida

Todo servicio de agente IA debe documentar en `docs/technical/agent-services.md`:

- framework elegido: `LangGraph`, `LangChain`, `Simple FastAPI` u otro;
- motivo de la decision;
- estado conversacional;
- skills usados;
- herramientas MCP usadas;
- criterio de testing.

## Anti-Patrones

- Usar LangGraph para un webhook lineal sin estado.
- Usar LangChain para ocultar logica de negocio que deberia estar en MCP/backend.
- Dejar prompts largos sin versionar.
- Acceder directo a la DB desde nodos del agente.
- Duplicar permisos o validaciones criticas fuera del MCP.
- Crear grafos dificiles de seguir por exceso de nodos sin valor.
