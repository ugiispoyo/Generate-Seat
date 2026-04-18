import type { VoucherFormData } from '../types'

export const AIRCRAFT_OPTIONS = ['ATR', 'Airbus 320', 'Boeing 737 Max'] as const

export const INITIAL_FORM: VoucherFormData = {
  name: '',
  id: '',
  flightNumber: '',
  date: '',
  aircraft: 'ATR',
}
