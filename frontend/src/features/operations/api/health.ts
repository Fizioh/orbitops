import { z } from "zod";

const healthSchema = z.object({
  status: z.string(),
  service: z.string(),
  demo_mode: z.boolean(),
  time_zone: z.string(),
});

export type HealthResponse = z.infer<typeof healthSchema>;

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${apiBaseUrl}/health/`);
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }
  const json: unknown = await response.json();
  return healthSchema.parse(json);
}
