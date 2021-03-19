/**
 * Пакет vuex-composition-helpers по какой-то причине не заработал (подозреваю, что ts не транспилировался)
 * И transpile в nuxt config не помог
 */

import { useContext, computed } from '@nuxtjs/composition-api'

/**
 * Функция для получения глубоко вложенного значения у объекта
 * @example
 * // returns 1
 * getDeepValue({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])
 *
 * @param {Object} obj - объект, из которого необходимо получить глубоко вложенное значение
 * @param {Array} namespaceList - список ключей для поиска значения
 * @returns {*}
 */
const getDeepValue = (obj, namespaceList) => {
    return namespaceList.reduce((acc, namespace) => acc[namespace], obj)
}

/**
 * Функция нормализует полученные аргументы, в зависимости от того, был ли передан namespace
 * @example
 * // returns ['cart/', ['addCartProduct']]
 * getDeepValue(['cart', ['addCartProduct']])
 * @example
 * // returns ['', ['init']]
 * getDeepValue([['init']])
 *
 * @param {Array} args - аргументы
 * @returns {Array}
 */
const normalizeArgs = args => args.length === 1
    ? ['', args[0]]
    : [`${args[0]}/`, args[1]]

/**
 * Возвращает объект запрашиваемых значений из state, обернутых computed
 *
 * @param {...Array} args - аргументы, первый из которых может отсутствовать - {String} namespace,
 *  второй - массив названий state или объект,
 *  где ключом является рельное название из state, а значением - возвращаемое название
 * @returns {Object}
 */
export const useState = (...args) => {
    const [namespace, getterNames] = normalizeArgs(args)

    if (typeof getterNames !== 'object') {
        return {}
    }

    const { store } = useContext()

    const namespaceList = namespace.split('/').slice(0, -1)

    if (Array.isArray(getterNames)) {
        return Object.fromEntries(
            getterNames
                .map(getterName => [
                    getterName,
                    computed(() => getDeepValue(store.state, namespaceList)[getterName]),
                ]),
        )
    }

    return Object.fromEntries(
        Object.entries(getterNames)
            .map(([
                getterSourceName,
                getterTargetName,
            ]) => [
                getterTargetName,
                computed(() => getDeepValue(store.state, namespaceList)[getterSourceName]),
            ]),
    )
}

/**
 * Возвращает объект запрашиваемых геттеров, обернутых computed
 *
 * @param {...Array} args - аргументы, первый из которых может отсутствовать - {String} namespace,
 * второй - массив названий геттеров или объект,
 *  где ключом является рельное название геттера, а значением - возвращаемое название
 * @returns {Object}
 */
export const useGetters = (...args) => {
    const [namespace, getterNames] = normalizeArgs(args)

    if (typeof getterNames !== 'object') {
        return {}
    }

    const { store } = useContext()

    if (Array.isArray(getterNames)) {
        return Object.fromEntries(
            getterNames
                .map(getterName => [
                    getterName,
                    computed(() => store.getters[namespace + getterName]),
                ]),
        )
    }

    return Object.fromEntries(
        Object.entries(getterNames)
            .map(([
                getterSourceName,
                getterTargetName,
            ]) => [
                getterTargetName,
                computed(() => store.getters[namespace + getterSourceName]),
            ]),
    )
}

/**
 * Возвращает объект функций, вызывающих запрашиваемые мутации
 *
 * @param {...Array} args - аргументы, первый из которых может отсутствовать - {String} namespace,
 * второй - массив названий мутаций или объект,
 *  где ключом является рельное название мутации, а значением - возвращаемое название
 * @returns {Object}
 */
export const useMutations = (...args) => {
    const [namespace, mutationNames] = normalizeArgs(args)

    if (typeof mutationNames !== 'object') {
        return {}
    }

    const { store } = useContext()

    if (Array.isArray(mutationNames)) {
        return Object.fromEntries(
            mutationNames
                .map(mutationName => [
                    mutationName,
                    (...localArgs) => store.commit(namespace + mutationName, ...localArgs),
                ]),
        )
    }

    return Object.fromEntries(
        Object.entries(mutationNames)
            .map(([
                mutationSourceName,
                mutationTargetName,
            ]) => [
                mutationTargetName,
                (...localArgs) => store.commit(namespace + mutationSourceName, ...localArgs),
            ]),
    )
}

/**
 * Возвращает объект функций, вызывающих запрашиваемые действия (actions)
 *
 * @param {...Array} args - аргументы, первый из которых может отсутствовать - {String} namespace,
 * второй - массив названий действий (actions) или объект,
 *  где ключом является рельное название действия (action), а значением - возвращаемое название
 * @returns {Object}
 */
export const useActions = (...args) => {
    const [namespace, actionNames] = normalizeArgs(args)

    if (typeof actionNames !== 'object') {
        return {}
    }

    const { store } = useContext()

    if (Array.isArray(actionNames)) {
        return Object.fromEntries(
            actionNames
                .map(actionName => [
                    actionName,
                    (...localArgs) => store.dispatch(namespace + actionName, ...localArgs),
                ]),
        )
    }

    return Object.fromEntries(
        Object.entries(actionNames)
            .map(([
                actionSourceName,
                actionTargetName,
            ]) => [
                actionTargetName,
                (...localArgs) => store.dispatch(namespace + actionSourceName, ...localArgs),
            ]),
    )
}
