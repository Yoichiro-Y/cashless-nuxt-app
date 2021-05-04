<template>
    <h2 class="text-4xl font-bold p-4 text-gray-700 ml-10">{{ title }}<span class="text-xl ml-2">{{ subtitle }}</span></h2> 
</template>
<script lang="ts">
export default {
    props: ['title', 'subtitle']
}
</script>