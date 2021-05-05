<template>
    <button class="ml-4 bg-transparent hover:bg-gray-200 text-gray-600 font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded-full mr-2">
        {{ text }}
    </button>
</template>
<script lang="ts">
export default {
    props: ['text']
}
</script>