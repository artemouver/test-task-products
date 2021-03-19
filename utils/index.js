/**
 * Случайное число в интервале от min до max
 *
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const random = (min, max) => min + Math.random() * (max - min)

/**
 * Обрезает дробную часть числа до decimals знаков после запятой
 * Если знаков после запятой изначально меньше, то оставляет как было
 *
 * @param {Number} num
 * @param {Number} decimals
 * @returns {Number}
 */
export const roundNumberToNDecimalPlaces = (num, decimals = 2) => Math.trunc(num * 10 ** decimals) / 10 ** decimals

/**
 * Возвращает ближайшее к num значение внутри интервала от min до max
 *
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
export const minmax = (num, min, max) => num |> (_ => Math.max(min, _)) |> (_ => Math.min(max, _))
