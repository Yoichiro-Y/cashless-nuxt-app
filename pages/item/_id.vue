<template>
    <div class="item-detail">
        <Header />
        <section class="text-gray-700 body-font overflow-hidden bg-white">
            <div class="container pt-8 mx-auto">
              <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img class="lg:w-1/2 w-full h-96 object-center rounded border border-gray-200" style="object-fit: contain;" :src="item.image" alt="" />
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:mt-0">
                  <h2 class="text-sm title-font text-gray-500 tracking-widest">{{ item.brand }}</h2>
                  <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ item.name }}</h1>
                  <div class="flex mb-4">
                    <span class="flex items-center">
                        <StarRating
                        v-model="item.score"
                        :star-size="StarRatingConfig.starSize"
                        :read-only="StarRatingConfig.readOnly"
                      />
                      <span class="text-gray-600 ml-3">{{ item.reviewCount }} Reviews</span>
                    </span>
                  </div>
                  <p class="leading-relaxed">{{ item.description }}</p>
                  <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    <span class="title-font font-medium text-2xl text-gray-900">{{ item.price }}円（税込）</span>
                  </div>
                  <div class="flex">
                    <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-for="review in reviews" :key="review.index">
                <div class="flex items-start w-screen">
                  <div class="flex-shrink-0">
                    <div class="inline-block relative">
                      <div class="relative w-16 h-16 rounded-full overflow-hidden">
                        <img v-if="review.score > 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/goodface.png"" alt="Profile picture">
                        <img v-if="review.score == 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/normalface.png"" alt="Profile picture">
                        <img v-if="review.score < 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/unsutisfiedface.png"" alt="Profile picture">
                        <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ml-6">
                    <p class="flex items-baseline">
                      <span class="text-gray-600 font-bold">{{ review.userName }}</span>
                    </p>
                    <div class="flex items-center mt-1">
                      <StarRating
                        v-model="review.score"
                        :star-size="20"
                        :read-only="StarRatingConfig.readOnly"
                      />
                    </div>
                    <div class="mt-3">
                      <span class="font-bold">{{ review.title }}</span>
                      <p class="mt-1">{{ review.description }}</p>
                    </div>
                    <div class="flex items-right justify-between mt-4 mb-7 text-sm text-gray-600 fill-current">
                      <div class="flex items-center">
                        <button class="flex items-center ml-6">
                          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
                          <span class="ml-2"> {{ review.good }}</span>
                        </button>
                        <button class="flex items-center ml-4">
                          <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
                          <span class="ml-2">{{ review.bad }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                <div v-if="!showReviewInput">
                    <button class="flex mt-5 ml-auto text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded" @click="showReviewInput = !showReviewInput">レビューを書く</button>
                </div>
                <div v-else>
                    <div class="item-score">
                        <StarRating v-model="newScore" :star-size="StarRatingConfig.starSize" />
                    </div>
                    <div>
                      <input class="autoexpand tracking-wide py-1 px-7 mb-3 leading-relaxed appearance-none block w-500 bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" v-model="newTitle"></input>
                    </div>
                    <div>
                    <textarea class="autoexpand tracking-wide py-2 px-10 mb-3 leading-relaxed appearance-none block w-500 bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" v-model="newReview" rows="5"></textarea>
                    </div>
                    <div class="flex">
                    <button @click="submit()" class="review-btn mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">レビューを投稿</button>
                    <button class="ml-4 flex mt-5 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded" @click="showReviewInput = !showReviewInput">閉じる</button>
                    </div>
                </div>
              </div>
            </div>
          </section>
        </div>
  </template>
   
  <script lang="ts">
  import Vue from 'vue'
  import Header from "@/components/Header.vue";
  import firebase from '@/plugins/firebase'
  import StarRating from 'vue-star-rating'
   
  export default Vue.extend({
    components: {
      StarRating,
      Header,
    },
    data: () => ({
      item: {
        name: '',
        image: '',
        description: '',
        brand: '',
        price: '',
        reviewCount: 0,
      },
      review: {
        userName: '',
        score: 0,
        description: '',
        id: '',
        title: '',
        good: 0,
        bad: 0,
      },
      reviews: [],
      entryDocId: '',
      errorMessage: '',
      reset: true,
      newScore: 0,
      newReview: '',
      newTitle: '',
      showReviewInput: false,
      StarRatingConfig: {
        starSize: 30,
        readOnly: true,
      },
    }),
    created() {
      const db = firebase.firestore()
      const docId = this.$route.params.id
      const dbItem = db.collection('items').doc(docId)

      const reviews = dbItem.collection("reviews");

      dbItem.get().then((doc) => {
        const data = doc.data()
        this.item.image = data.image ? data.image : '/no-image.png'
        this.item.name = data.name ? data.name : ''
        this.item.brand = data.brand ? data.brand : ''
        this.item.score = data.score ? data.score : 0
        this.item.price = data.price ? data.price : 0
        this.item.description = data.description ? data.description : ''
        this.item.reviewCount = data.reviewCount ? data.reviewCount : 0
      })

      reviews.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
 
        const review = {
          id: doc.id,
          score: data.score ? data.score : 0,
          description: data.description ? data.description : 'コメントはありません',
          userName: data.userName ? data.userName : '名称未登録',
          title: data.title ? data.title : '',
        }
        this.reviews.push(review)
      })
    })
    },
    methods: {
      submit() {
        const db = firebase.firestore()
        const docId = this.$route.params.id
        const dbItem = db.collection('items').doc(docId)
        var user = firebase.auth().currentUser;
        

        dbItem
          .collection("reviews")
          .add({ userName: user.displayName, id: user.uid, score: this.newScore, description: this.newReview, title: this.newTitle })
          .then(() => {
            dbItem.get().then((doc) =>{
              dbItem.update({
                reviewCount: doc.data().reviewCount + 1
            })
            location.reload()
          })
        });
      },
    },
  })
  </script>