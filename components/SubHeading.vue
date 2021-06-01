<template>
    <h2 class="text-4xl font-bold p-4 text-gray-700 ml-10"><span class="hidden md:block">{{ title }}</span><span class="text-xl">{{ subtitle }}</span></h2> 
</template>
<script lang="ts">
export default {
    props: ['title', 'subtitle']
}
</script>