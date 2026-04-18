import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { INITIAL_FORM } from '../constants/voucherConstants'
import { checkVoucher, generateVoucher } from '../services/voucherApi'
import type { VoucherFormData } from '../types'

function formatApiError(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

export function useVoucherGenerator() {
  const [form, setForm] = useState<VoucherFormData>(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [seats, setSeats] = useState<string[]>([])

  const canSubmit = useMemo(() => {
    return Boolean(
      form.name.trim() &&
      form.id.trim() &&
      form.flightNumber.trim() &&
      form.date &&
      form.aircraft
    )
  }, [form])

  const onChangeField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    const field = name as keyof VoucherFormData

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setSeats([])

    try {
      const checkResponse = await checkVoucher({
        flightNumber: form.flightNumber.trim().toUpperCase(),
        date: form.date,
      })

      if (checkResponse.exists) {
        setError('Vouchers already generated for this flight and date')
        return
      }

      const generatedResponse = await generateVoucher({
        name: form.name.trim(),
        id: form.id.trim(),
        flightNumber: form.flightNumber.trim().toUpperCase(),
        date: form.date,
        aircraft: form.aircraft,
      })

      if (generatedResponse.success && Array.isArray(generatedResponse.seats)) {
        setSeats(generatedResponse.seats)
      } else {
        setError('Seat generation failed. Please try again.')
      }
    } catch (requestError: unknown) {
      setError(formatApiError(requestError, 'Unable to generate vouchers right now.'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    isLoading,
    error,
    seats,
    canSubmit,
    onChangeField,
    handleGenerate,
  }
}
