import type {
  CheckVoucherPayload,
  CheckVoucherResponse,
  GenerateVoucherPayload,
  GenerateVoucherResponse,
} from '../types'

async function postJson<TResponse>(url: string, payload: unknown): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = body?.message || 'Request failed. Please try again.'
    throw new Error(message)
  }

  return body as TResponse
}

export function checkVoucher(payload: CheckVoucherPayload): Promise<CheckVoucherResponse> {
  return postJson<CheckVoucherResponse>('/api/check', payload)
}

export function generateVoucher(payload: GenerateVoucherPayload): Promise<GenerateVoucherResponse> {
  return postJson<GenerateVoucherResponse>('/api/generate', payload)
}
