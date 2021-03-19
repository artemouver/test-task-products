import { computed } from '@nuxtjs/composition-api'
import { useState } from '@/hooks/useVuexHelpers'

/**
 * Возвращаются значения и методы для работы с валютой
 * currency - текущая валюта
 * formatAmount - функция для форматирования числа в стоимость
 */
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
