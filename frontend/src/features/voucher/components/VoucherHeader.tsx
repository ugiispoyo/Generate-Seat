function VoucherHeader() {
  return (
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
  )
}

export default VoucherHeader
