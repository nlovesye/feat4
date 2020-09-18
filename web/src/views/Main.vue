<template>
    <div class="p_home">
        <the-header />
        <router-view />
    </div>
</template>

<script>
import TheHeader from '@/components/Header'
export default {
    name: 'Main',
    components: {
        TheHeader
    }
}
</script>

<style lang="css" scoped>
.p_home {
    padding-top: 42px;
}
</style>
