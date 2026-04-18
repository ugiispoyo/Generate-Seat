import { useMemo, useState } from 'react'

const AIRCRAFT_OPTIONS = ['ATR', 'Airbus 320', 'Boeing 737 Max']

const INITIAL_FORM = {
  name: '',
  id: '',
  flightNumber: '',
  date: '',
  aircraft: 'ATR',
}

function formatApiError(error, fallback) {
  if (error?.message) {
    return error.message
  }

  return fallback
}

async function postJson(url, payload) {
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

  return body
}

function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [seats, setSeats] = useState([])

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.id.trim() &&
      form.flightNumber.trim() &&
      form.date &&
      form.aircraft
    )
  }, [form])

  const onChangeField = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setSeats([])

    try {
      const checkResponse = await postJson('/api/check', {
        flightNumber: form.flightNumber.trim().toUpperCase(),
        date: form.date,
      })

      if (checkResponse.exists) {
        setError('Vouchers already generated for this flight and date')
        return
      }

      const generatedResponse = await postJson('/api/generate', {
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
    } catch (requestError) {
      setError(formatApiError(requestError, 'Unable to generate vouchers right now.'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative overflow-hidden px-4 py-8 sm:px-6 md:py-12">
      <div className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-ember-300/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-24 h-48 w-48 rounded-full bg-skybrand-400/30 blur-3xl" />

      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="animate-rise rounded-3xl border border-skybrand-100/90 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
          <div className="mb-7">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-skybrand-500">
              Astronacci Flight Assignment
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-skybrand-900 sm:text-4xl">
              Voucher Seat Assignment
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-skybrand-700 sm:text-base">
              Generate exactly 3 unique random seats per flight, validated against aircraft layout with duplicate flight protection.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="grid gap-4 sm:grid-cols-2">
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
        </article>

        <aside
          className="animate-rise rounded-3xl border border-skybrand-100/80 bg-white/70 p-6 shadow-soft backdrop-blur sm:p-8"
          style={{ animationDelay: '120ms' }}
        >
          <div className="animate-float inline-flex rounded-full bg-ember-300/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ember-500">
            Live Result
          </div>

          <h2 className="mt-4 font-display text-2xl font-bold text-skybrand-900">Assigned Seats</h2>
          <p className="mt-2 text-sm leading-relaxed text-skybrand-700">
            Once generated, these three seats are locked for this flight and date.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[0, 1, 2].map((index) => {
              const seat = seats[index]

              return (
                <div
                  key={index}
                  className={`rounded-2xl border px-4 py-4 text-center transition ${
                    seat
                      ? 'animate-rise border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border-skybrand-100 bg-white text-skybrand-400'
                  }`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">Seat {index + 1}</p>
                  <p className="mt-1 font-display text-2xl font-bold">{seat || '--'}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-skybrand-100 bg-skybrand-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-skybrand-500">Rule Snapshot</p>
            <ul className="mt-3 space-y-2 text-sm text-skybrand-700">
              <li>3 seats only, random and unique.</li>
              <li>Seat validity follows selected aircraft layout.</li>
              <li>Duplicate flight number and date is blocked.</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
