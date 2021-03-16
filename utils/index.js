export const random = (min, max) => min + Math.random() * (max - min)

export const roundNumberToNDecimalPlaces = (num, decimals) => Math.trunc(num * 10 ** decimals) / 10 ** decimals
