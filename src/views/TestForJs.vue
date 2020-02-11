<template>
    <section id="page-for-js">
        JS,模板内容一样{{ example }}
    </section>
</template>

<script>
export default {
    props: {
        testProp: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            example: '例子'
        }
    },
    watch: {
        example (newValue, oldValue) {
            console.log('newValue: ', newValue)
            console.log('oldValue: ', oldValue)
        }
    },
    computed: {
        testComputedMethods () {
            console.log('this is a computed methods')
            return '(╯▽╰)'
        }
    },
    methods: {
        testMethods () {
            console.log('this is a methods')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
