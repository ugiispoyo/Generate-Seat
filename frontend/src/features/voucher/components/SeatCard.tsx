type SeatCardProps = {
  seat?: string
  index: number
}

function SeatCard({ seat, index }: SeatCardProps) {
  return (
    <div
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
}

export default SeatCard
