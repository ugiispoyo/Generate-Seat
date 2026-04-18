import VoucherHeader from './VoucherHeader'
import VoucherForm from './VoucherForm'
import type { ChangeEventHandler, FormEventHandler } from 'react'
import type { VoucherFormData } from '../types'

type VoucherFormCardProps = {
  form: VoucherFormData
  isLoading: boolean
  error: string
  canSubmit: boolean
  onChangeField: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  onGenerate: FormEventHandler<HTMLFormElement>
}

function VoucherFormCard({ form, isLoading, error, canSubmit, onChangeField, onGenerate }: VoucherFormCardProps) {
  return (
    <article className="animate-rise rounded-3xl border border-skybrand-100/90 bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8">
      <VoucherHeader />
      <VoucherForm
        form={form}
        isLoading={isLoading}
        error={error}
        canSubmit={canSubmit}
        onChangeField={onChangeField}
        onGenerate={onGenerate}
      />
    </article>
  )
}

export default VoucherFormCard
