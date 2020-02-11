<template>
    <section id="page-for-ts">
        TS,模板内容一样{{ example }}
    </section>
</template>

// 加上lang="ts" 就是使用ts 不加就是js
<script lang="ts">
// TS不一样的地方，需要使用vue装饰器
import {
    Vue,
    Component,
    Watch,
    Prop
} from 'vue-property-decorator'
// ↓ 组件装饰器必须要有，
@Component({})
// ↓ Vue装饰器用来声明类，相当于声明一个命名空间
export default class TestForTs extends Vue {
    // ts 中子组件接受属性也要用装饰器，括号里的用法和js中一样
    @Prop({ type: String, default: '' })
    // 在ts中 变量必须要有初始值，但是作为接受父组件的属性变量，
    // 不希望有初始值，就可以加感叹号(!) 表示告诉ts 这个变量开发者会处理
    testProp!: string
    // js里data里的数据，在ts里直接写就可以
    // ts 比 js 多一个类型声明， string/number/object/boolean之类的,
    // 刚开始用不会就不用或者用any，哈哈哈，any万能的
    example: string = '用声明的例子'
    example2 = '不用声明的例子'
    example3: any = '使用any的例子'

    // ts中的watch需要用到装饰器
    @Watch('example')
    exampleChange (newValue: string, oldValue: string) {
        console.log('newValue: ', newValue)
        console.log('oldValue: ', oldValue)
    }

    // js 中的计算属性，在ts中也是直接写，在函数前加get就是计算属性
    // 计算属性必须有返回值
    get testComputedMethods () {
        console.log('this is a computed methods')
        return '(╯▽╰)'
    }

    // js中的方法在ts中可以直接写，不用写methods，只要是函数就是方法
    testMethods () {
        console.log('this is a methods')
    }
}
</script>

<style lang="scss" scoped>

</style>
