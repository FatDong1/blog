<template>
    <div @click="trigger" id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    h1 {
        color: red
    }
</style>
<script>
    export default {
        data(){
            return {
                a:1,
                b:2
            }
        },

        beforeCreate() {
            console.log('App beforeCreate');
        },
        created() {
            console.log('App created');
        },
        beforeMount() {
            console.log('App beforeMount');
        },
        mounted() {
            console.log('App mounted');
        },
        methods: {
            trigger() {
              console.log('触发点击事件');
            }
        }
    }
</script>