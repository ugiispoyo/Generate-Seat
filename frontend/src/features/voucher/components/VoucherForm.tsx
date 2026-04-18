import { AIRCRAFT_OPTIONS } from '../constants/voucherConstants'
import type { ChangeEventHandler, FormEventHandler } from 'react'
import type { VoucherFormData } from '../types'

type VoucherFormProps = {
  form: VoucherFormData
  isLoading: boolean
  error: string
  canSubmit: boolean
  onChangeField: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  onGenerate: FormEventHandler<HTMLFormElement>
}

function VoucherForm({ form, isLoading, error, canSubmit, onChangeField, onGenerate }: VoucherFormProps) {
  return (
    <form onSubmit={onGenerate} className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-1">
        <span className="mb-1 block text-sm font-semibold text-skybrand-900">Crew Name</span>
        <input
          name="name"
          value={form.name}
          onChange={onChangeField}
          placeholder="Sarah"
          required
          className="w-full rounded-xl border border-skybrand-100 bg-white px-3 py-2.5 text-sm text-skybrand-900 outline-none transition focus:border-skybrand-400 focus:ring-2 focus:ring-skybrand-100"
        />
      </label>

      <label className="sm:col-span-1">
        <span className="mb-1 block text-sm font-semibold text-skybrand-900">Crew ID</span>
        <input
          name="id"
          value={form.id}
          onChange={onChangeField}
          placeholder="98123"
          required
          className="w-full rounded-xl border border-skybrand-100 bg-white px-3 py-2.5 text-sm text-skybrand-900 outline-none transition focus:border-skybrand-400 focus:ring-2 focus:ring-skybrand-100"
        />
      </label>

      <label className="sm:col-span-1">
        <span className="mb-1 block text-sm font-semibold text-skybrand-900">Flight Number</span>
        <input
          name="flightNumber"
          value={form.flightNumber}
          onChange={onChangeField}
          placeholder="GA102"
          required
          className="w-full rounded-xl border border-skybrand-100 bg-white px-3 py-2.5 text-sm uppercase text-skybrand-900 outline-none transition focus:border-skybrand-400 focus:ring-2 focus:ring-skybrand-100"
        />
      </label>

      <label className="sm:col-span-1">
        <span className="mb-1 block text-sm font-semibold text-skybrand-900">Flight Date</span>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={onChangeField}
          required
          className="w-full rounded-xl border border-skybrand-100 bg-white px-3 py-2.5 text-sm text-skybrand-900 outline-none transition focus:border-skybrand-400 focus:ring-2 focus:ring-skybrand-100"
        />
      </label>

      <label className="sm:col-span-2">
        <span className="mb-1 block text-sm font-semibold text-skybrand-900">Aircraft Type</span>
        <select
          name="aircraft"
          value={form.aircraft}
          onChange={onChangeField}
          className="w-full rounded-xl border border-skybrand-100 bg-white px-3 py-2.5 text-sm text-skybrand-900 outline-none transition focus:border-skybrand-400 focus:ring-2 focus:ring-skybrand-100"
        >
          {AIRCRAFT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="sm:col-span-2 mt-1 flex flex-col gap-2">
        <button
          type="submit"
          disabled={!canSubmit || isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-skybrand-500 px-4 py-3 font-body text-sm font-semibold text-white shadow-soft transition hover:bg-skybrand-700 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating...
            </>
          ) : (
            'Generate Vouchers'
          )}
        </button>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}
      </div>
    </form>
  )
}

export default VoucherForm
