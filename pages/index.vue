<template>
  <div class="w-full">
    <div>
      <Header />
      <main>
        <div class="flex bg-white" style="height:600px;">
          <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
              <div>
                  <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl"><span class="text-indigo-600">オトコ</span>のための<span class="text-indigo-600">コスメ</span>情報サイト</h2>
                  <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl"><span class="text-indigo-600">OTOCOS</span> へようこそ</h2>
                  <p class="mt-2 text-sm text-gray-500 md:text-base">「コスメ」という言葉の響きから、女性が使用するような化粧品を思い浮かべる方もいるかもしれません。<br>一般的に「メンズコスメ」とは、洗顔や保湿などのスキンケアやヘアケアを中心としたアイテムのことを指します。ビジネスシーンなどあらゆるシーンにおいて好印象を与えるためには清潔感が必要だったり、冬になると乾燥によるカサツキなどのトラブルを防ぐために保湿が欠かせなかったり...<br>以前よりもスキンケアを意識する男性が増えているんです。</p>
                  <div class="flex justify-center lg:justify-start mt-6">
                      <a class="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800" href="#">新規登録</a>
                      <a class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">ログイン</a>
                  </div>
              </div>
            </div>
            <div class="hidden lg:block lg:w-1/2" style="clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)">
              <div class="h-full object-cover bg">
                  <div class="h-full bg-black opacity-25"></div>
              </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.4.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.4.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
			Header,
			Footer
  }
}
</script>

<style>
.bg{
  background-image: url("~@/assets/images/homeimage.jpeg");
  height: 600px;
}
</style>
