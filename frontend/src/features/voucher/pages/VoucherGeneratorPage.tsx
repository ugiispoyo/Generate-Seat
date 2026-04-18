import SeatResultPanel from '../components/SeatResultPanel'
import VoucherFormCard from '../components/VoucherFormCard'
import { useVoucherGenerator } from '../hooks/useVoucherGenerator'

function VoucherGeneratorPage() {
  const {
    form,
    isLoading,
    error,
    seats,
    canSubmit,
    onChangeField,
    handleGenerate,
  } = useVoucherGenerator()

  return (
    <main className="relative overflow-hidden px-4 py-8 sm:px-6 md:py-12">
      <div className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-ember-300/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 top-24 h-48 w-48 rounded-full bg-skybrand-400/30 blur-3xl" />

      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <VoucherFormCard
          form={form}
          isLoading={isLoading}
          error={error}
          canSubmit={canSubmit}
          onChangeField={onChangeField}
          onGenerate={handleGenerate}
        />
        <SeatResultPanel seats={seats} />
      </section>
    </main>
  )
}

export default VoucherGeneratorPage
