export const random = (min, max) => min + Math.random() * (max - min)

export const roundNumberToNDecimalPlaces = (num, decimals = 2) => Math.trunc(num * 10 ** decimals) / 10 ** decimals

export const minmax = (num, min, max) => num |> (_ => Math.max(min, _)) |> (_ => Math.min(max, _))
