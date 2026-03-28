# Health Check Endpoints

This document describes the health check endpoints available in the FirstVoyage operator API.

## Overview

Health check endpoints allow operators and monitoring systems to verify that the service is running correctly. Use these endpoints in load balancers, uptime monitors, and CI pipelines.

## Endpoints

| Endpoint  | Service      | Port | Method | Description                          |
|-----------|--------------|------|--------|--------------------------------------|
| `/health` | Operator API | 8080 | GET    | Returns the overall health status of the operator API service. |

## Endpoint Details

### `GET /health`

Returns the health status of the operator API.

**Base URL:** `http://localhost:8080`

**Response codes:**

| Status Code | Meaning                                      |
|-------------|----------------------------------------------|
| `200 OK`    | Service is healthy and ready to handle requests. |
| `503 Service Unavailable` | Service is unhealthy or not ready.  |

**Example response (healthy):**

```json
{
  "status": "ok"
}
```

**Example response (unhealthy):**

```json
{
  "status": "unavailable"
}
```

## Example `curl` Commands

### Basic health check

```bash
curl http://localhost:8080/health
```

### Check with HTTP status code output

```bash
curl -o /dev/null -s -w "%{http_code}\n" http://localhost:8080/health
```

### Verbose output (show headers and response)

```bash
curl -v http://localhost:8080/health
```

### Pretty-print JSON response

```bash
curl -s http://localhost:8080/health | jq .
```

### Fail script if service is unhealthy (exit 1 on non-2xx)

```bash
curl --fail http://localhost:8080/health && echo "Service is healthy"
```

## Usage in Monitoring

For automated monitoring or liveness probes, poll `/health` at a regular interval (e.g., every 30 seconds). A `200` response indicates the service is operational. Treat any non-`200` response or a connection failure as an alert condition.
