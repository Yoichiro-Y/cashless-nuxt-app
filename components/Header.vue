<template>
  <div class="w-full">
    <nav class="bg-white shadow-lg">
        <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div class="flex justify-between items-center">
               <div class="text-2xl font-bold text-gray-800 md:text-3xl">
                    <a href="/">OTOCOS</a>
               </div>
                <div class="md:hidden">
                    <button type="button" class="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path class="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
                            <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-col md:flex-row hidden md:block -mx-2">
                <a href="/" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">ホーム</a>
                <a href="/signup" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">新規登録</a>
                <a href="/signin" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">ログイン</a>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
	import HeaderNav from "@/components/HeaderNav.vue";
	export default {
		components: {
			HeaderNav
		}
	};
</script>