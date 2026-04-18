import SeatCard from './SeatCard'

type SeatResultPanelProps = {
  seats: string[]
}

function SeatResultPanel({ seats }: SeatResultPanelProps) {
  return (
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
        {[0, 1, 2].map((index) => (
          <SeatCard key={index} index={index} seat={seats[index]} />
        ))}
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
  )
}

export default SeatResultPanel
