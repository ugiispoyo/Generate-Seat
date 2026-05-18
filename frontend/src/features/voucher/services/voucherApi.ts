import type {
  CheckVoucherPayload,
  CheckVoucherResponse,
  GenerateVoucherPayload,
  GenerateVoucherResponse,
} from "../types";

async function postJson<TResponse>(
  url: string,
  payload: unknown,
  method: string = "POST",
): Promise<TResponse> {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => ({}));
  console.log("API Response:", { url, payload, response: body });

  if (!response.ok) {
    const message = body?.message || "Request failed. Please try again.";
    throw new Error(message);
  }

  return body as TResponse;
}

export function checkVoucher(
  payload: CheckVoucherPayload,
): Promise<CheckVoucherResponse> {
  return postJson<CheckVoucherResponse>("/api/check", payload);
}

export function generateVoucher(
  payload: GenerateVoucherPayload,
): Promise<GenerateVoucherResponse> {
  return postJson<GenerateVoucherResponse>("/api/generate", payload);
}

export function reGenerateVoucher(payload: {
  seat: number;
  flightNumber: string;
}): Promise<GenerateVoucherResponse> {
  return postJson<GenerateVoucherResponse>("/api/retry", payload);
}
