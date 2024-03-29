<template>
    <div class="campaign-detail">
        <Header />
        <section class="text-gray-700 body-font overflow-hidden bg-white">
            <div class="container pt-8 mx-auto">
              <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img class="lg:w-1/2 w-full h-96 object-center rounded border border-gray-200" style="object-fit: contain;" :src="campaign.image" alt="" />
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:mt-0">
                  <div class="title-font font-medium text-2xl text-gray-900">{{ campaign.payment }}</div>
                  <span class="font-medium text-gray-700 text-base my-2 uppercase h-10">{{ campaign.start }} ~ {{ campaign.end }}</span>
                  <div>最大還元率{{ campaign.rate }}%</div>
                  <div v-if="campaign.limit == 99999">還元上限なし</div>
                  <div v-else>還元上限{{ campaign.limit }}P</div>
                  <div>対象店舗：{{ campaign.store }}</div>
                  <div class="flex mb-4">
                    <span class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 w-full">
                        <StarRating
                        :rating="campaign.score"
                        :star-size="StarRatingConfig.starSize"
                        :read-only="StarRatingConfig.readOnly"
                      />
                      <span class="text-gray-600 ml-3">{{ campaign.reviewCount }} Reviews</span>
                    </span>
                  </div>
                  <div class="flex">
                    <button v-if="loggedIn" class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg @click="like();" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-for="review in reviews" :key="review.index">
                    <Review
                    :score="review.score"
                    :userName="review.userName"
                    :title="review.title"
                    :description="review.description"
                    :good="review.good"
                    :userId="review.userId"
                    :id="review.id"
                    object="campaigns"
                    />
                </div>
                <div v-if="loggedIn">
                  <div v-if="!showReviewInput">
                      <t-button class="mt-5" @click="showReviewInput = !showReviewInput">レビューを書く</t-button>
                  </div>
                  <div v-else>
                      <div class="item-score">
                          評価<StarRating v-model="newScore" :star-size="StarRatingConfig.starSize" />
                      </div>
                      <div>
                        タイトル<t-input v-model="newTitle"></t-input>
                      </div>
                      <div>
                        内容<t-textarea v-model="newReview" rows="5"></t-textarea>
                      </div>
                      <div class="flex">
                      <t-button @click="submit()" class="mt-5 mb-10">レビューを投稿</t-button>
                      <button class="ml-4 flex mt-5 text-white bg-gray-500 border-0 py-2 px-6 mb-10 focus:outline-none hover:bg-gray-600 rounded" @click="showReviewInput = !showReviewInput">閉じる</button>
                      </div>
                  </div>
                </div>
                <div v-else>
                  ログインすることでレビューを投稿できます
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
  </template>
   
  <script lang="ts">
  import Vue from 'vue'
  import VueTailwind from 'vue-tailwind'
  import Footer from "@/components/Footer.vue";
  import Header from "@/components/Header.vue";
  import Review from "@/components/review/Review.vue";
  import firebase from '@/plugins/firebase'
  import StarRating from 'vue-star-rating'
  import settings from '@/components/vue-tailwind.js'
   
  export default Vue.extend({
    components: {
      StarRating,
      Header,
      Review,
      Footer,
    },
    mounted() {
      this.setupFirebase()
    },
    data: () => ({
      campaign: {
        name: '',
        image: '',
        rate: '',
        limit: '',
        start: '',
        end: '',
        brand: '',
        payment: '',
        reviewCount: 0,
        store: '',
      },
      review: {
        userName: '',
        score: 0,
        description: '',
        userId: '',
        title: '',
        good: 0,
        bad: 0,
        goodCount: 0,
      },
      loggedIn: false,
      reviews: [],
      entryDocId: '',
      errorMessage: '',
      reset: true,
      newScore: 0,
      newReview: '',
      newTitle: '',
      currentColor: '',
      showReviewInput: false,
      StarRatingConfig: {
        starSize: 30,
        readOnly: true,
      },
    }),
    created() {
      const db = firebase.firestore()
      const docId = this.$route.params.id
      const dbItem = db.collection('campaigns').doc(docId)

      const reviews = dbItem.collection("reviews").orderBy("good", "desc");

      this.currentColor = 'red'

      dbItem.get().then((doc) => {
        const data = doc.data()
        this.campaign.image = data.image ? data.image : '/no-image.png'
        this.campaign.score = data.score ? data.score : 0
        this.campaign.payment = data.payment ? data.payment : 0
        this.campaign.rate = data.rate ? data.rate : ''
        this.campaign.limit = data.limit ? data.limit : 0
        this.campaign.start = data.start ? data.start : ''
        this.campaign.end = data.end ? data.end : ''
        this.campaign.store = data.store ? data.store : ''
        this.campaign.reviewCount = data.reviewCount ? data.reviewCount : 0
      })

      reviews.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        console.log(data)
 
        const review = {
          id: doc.id,
          userId: data.userId,
          score: data.score ? data.score : 0,
          description: data.description ? data.description : 'コメントはありません',
          userName: data.userName ? data.userName : '名称未登録',
          title: data.title ? data.title : '',
          good: data.good ? data.good  : 0
        }
        this.reviews.push(review)
      })
    })
    },
    methods: {
      submit() {
        const db = firebase.firestore()
        const docId = this.$route.params.id
        const dbItem = db.collection('campaigns').doc(docId)
        var user = firebase.auth().currentUser;
        

        dbItem
          .collection("reviews")
          .add({ userName: user.displayName, userId: user.uid, score: this.newScore, description: this.newReview, title: this.newTitle, good: 0 })
          .then(() => {
            dbItem.get().then((doc) =>{
              dbItem.update({
                reviewCount: doc.data().reviewCount + 1
            })
            location.reload()
          })
        });
      },
      like(id) {
        var user = firebase.auth().currentUser;
        this.$store.dispatch('campaigns/like', { id: user.uid, campaignId: this.$route.params.id})
        this.currentColor = 'red'
      },
      setupFirebase() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log('logged in')
                this.loggedIn = true;
            } else {
                this.loggedIn = false;
            }
        })
      }
    },
  })
  </script>