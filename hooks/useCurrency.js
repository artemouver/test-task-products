import { computed } from '@nuxtjs/composition-api'
import { useState } from '@/hooks/useVuexHelpers'

export default () => {
    const { currency } = useState(['currency'])
    const amountFormatter = computed(() => new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: currency.value,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }))
    const formatAmount = value => amountFormatter.value.format(value)

    return {
        currency,
        formatAmount,
    }
}
