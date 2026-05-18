import type { AIRCRAFT_OPTIONS } from './constants/voucherConstants'

export type AircraftType = (typeof AIRCRAFT_OPTIONS)[number]

export type VoucherFormData = {
  name: string
  id: string
  flightNumber: string
  date: string
  aircraft: AircraftType
  retry?: boolean
  seat?: number
}

export type CheckVoucherPayload = {
  flightNumber: string
  date: string
}

export type GenerateVoucherPayload = VoucherFormData

export type CheckVoucherResponse = {
  exists: boolean
}

export type GenerateVoucherResponse = {
  success: boolean
  seats?: string[]
  seat?: string
  seatIndex?: number
  message?: string
}
