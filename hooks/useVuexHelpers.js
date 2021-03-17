/**
 * Пакет vuex-composition-helpers по какой-то причине не заработал
 * И transpile в nuxt config не помог
 */

import { useContext, computed } from '@nuxtjs/composition-api'

const getDeepValue = (obj, namespaceList) => {
    return namespaceList.reduce((acc, namespace) => acc[namespace], obj)
}

const normalizeArgs = args => args.length === 1
    ? ['', args[0]]
    : [`${args[0]}/`, args[1]]

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
