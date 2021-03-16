<template lang="pug">
.main-container
    .product-sections
        .product-sections-col(
            v-for="colNum in countCols"
            :key="`product-sections-col-${colNum}`"
        )
            SectionItem(
                v-for="sectionItem in sectionList.filter((_, index) => index % countCols === colNum - 1)"
                :key="`section-item-${sectionItem.id}`"
                :sectionId="sectionItem.id"
                :label="sectionItem.name"
            )
</template>

<script>
import {
    defineComponent,
    useContext,
    onServerPrefetch,
    computed,
    ref,
} from '@nuxtjs/composition-api'
import Section from '@/models/Section'
import SectionItem from '@/components/SectionItem'
export default defineComponent({
    components: {
        SectionItem,
    },

    setup() {
        const { store } = useContext()
        onServerPrefetch(async () => {
            await store.dispatch('init')
        })
        store.dispatch('startBroadcast')

        const countCols = ref(2)
        const sectionList = computed(() => Section.query().has('products').get())
        return {
            sectionList,
            countCols,
        }
    },
})
</script>

<style lang="stylus" scoped>
.product-sections
    display flex
    padding 10px
.product-sections-col
    flex 1
    &:not(:first-child)
        margin-left 10px
    & > *:not(:first-child)
        margin-top 5px
</style>
