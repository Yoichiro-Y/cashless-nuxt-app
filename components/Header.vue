<template>
  <div class="w-full">
    <nav class="bg-white shadow-lg">
        <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div class="flex justify-between items-center">
               <div class="text-2xl font-bold text-gray-800 md:text-3xl">
                    <a href="/"><img src="@/assets/images/logo.png" class="w-32" alt="poimon-logo" border="0"></a>
               </div>
                <div class="md:hidden">
                    <button @click="isOpen = !isOpen" type="button" class="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
                            <div class="relative py-3 sm:max-w-xl mx-auto">
                                <nav x-data="{ open: false }">
                                    <button class="text-gray-500 w-10 h-10 focus:outline-none bg-white" @click="open = !open">
                                        <span class="sr-only">Open main menu</span>
                                        <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                                            <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
                                            <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
                                            <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
                                        </div>
                                    </button>
                                </nav>
                            </div>
                    </button>
                </div>
            </div>
            <div class="hidden lg:block">
                <Search />
            </div>
            <div class="flex flex-col md:flex-row hidden md:block -mx-2">
                <div v-if="loggedIn">
                    <a href="/" class="text-gray-800 rounded hover:bg-gray-700 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">ホーム</a>
                    <nuxt-link :to="`/user/${user.id}`" class="text-gray-800 rounded hover:bg-gray-700 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">マイページ</nuxt-link>
                    <a @click="logout" class="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">ログアウト</a>
                </div>
                <div v-else>
                    <a href="/" class="text-gray-800 rounded hover:bg-gray-700 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">ホーム</a>
                    <a href="/signup" class="text-gray-800 rounded hover:bg-gray-700 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">新規登録</a>
                    <nuxt-link to="/login"　class="text-gray-800 rounded hover:bg-gray-700 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2">ログイン</nuxt-link>
                </div>
            </div>
        </div>
    </nav>
    <nav class="bg-white shadow-lg">
    
    <div v-if="isOpen">
        <ul v-if="loggedIn">
            <li><a href="/" class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white">ホーム</a></li>
            <li><a @click="logout" class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white">ログアウト</a></li>
            <li class="ml-3 pb-3 mt-3"><Search /></li>
        </ul>
        <ul v-else>
            <li><a href="/" class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white">ホーム</a></li>
            <li><a href="/signup" class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white">新規登録</a></li>
            <li><nuxt-link to="/login"　class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white">ログイン</nuxt-link></li>
            <li class="ml-3 pb-3 mt-3"><Search /></li>
        </ul>
    </div>
    </nav>  
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import firebase from '@/plugins/firebase'
import 'firebase/auth';
import PoimonButton from "@/components/common/PoimonButton.vue";

export default {
    created() {
        this.user.id = firebase.auth().currentUser ? firebase.auth().currentUser.uid : ''
    },
    mounted() {
        this.setupFirebase()
    },
    data: () => ({
        loggedIn: false,
        isOpen: false,
        open: false,
        user: {
            id: ''
        }
    }),
    components: {
        Search,
        PoimonButton,
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push('/')
            })
        },
        setupFirebase() {
            firebase.auth().onAuthStateChanged(user => {
                if(user) {
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                }
            })
        }
    }
    }
</script>