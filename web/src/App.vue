<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script>
</script>

<style lang="css">
html, body, .app {
    width: 100%;
    height: 100%;
}
.clear{
    zoom: 1;
}
.clear:after {
    clear: both;
    content: '';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
}
</style>
