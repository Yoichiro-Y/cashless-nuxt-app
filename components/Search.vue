<template>
    <form method="GET" @submit.prevent="search">
        <div class="relative text-gray-600 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button @click="search()" type="submit" class="p-1 focus:outline-none focus:shadow-outline">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
        </span>
        <input type="text" v-model="seatchText"  name="q" class="py-2 text-sm text-white bg-gray-200 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="オトクな情報を検索" autocomplete="off"></input>
        </div>
    </form>
</template>


<script>
    import Search from "@/components/Search.vue";
    import * as firebase from 'firebase/app';
    import 'firebase/auth';
    import PoimonButton from "@/components/common/PoimonButton.vue";
    
    export default {
        data: () => ({
            seatchText: '',
        }),
        methods: {
            search() {
                if(this.seatchText != undefined) this.$router.push(`/campaign?search=${this.seatchText.toLowerCase()}`)
            },
        }
        }
</script>