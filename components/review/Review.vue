<template>
    <div class="flex items-start w-screen">
        <div class="flex-shrink-0">
          <div class="inline-block relative">
            <div class="relative w-16 h-16 rounded-full overflow-hidden">
              <img v-if="$props.score > 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/goodface.png"" alt="Profile picture">
              <img v-if="$props.score == 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/normalface.png"" alt="Profile picture">
              <img v-if="$props.score < 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/unsatisfiedface.png"" alt="Profile picture">
              <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>
        <div class="ml-6">
          <p class="flex items-baseline">
            <span class="text-gray-600 font-bold">{{ $props.userName }}</span>
          </p>
          <div class="flex items-center mt-1">
            <StarRating
              :rating="$props.score"
              :star-size="20"
              :read-only="StarRatingConfig.readOnly"
            />
          </div>
          <div class="mt-3">
            <span class="font-bold">{{ $props.title }}</span>
            <p class="mt-1">{{ $props.description }}</p>
          </div>
          <div class="flex items-right justify-between mt-4 mb-7 text-sm text-gray-600 fill-current">
            <div class="flex items-center">
              <button class="flex items-center ml-6">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
                <span class="ml-2"> {{ $props.good }}</span>
              </button>
              <button class="flex items-center ml-4">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
                <span class="ml-2">{{ $props.bad }}</span>
              </button>
            </div>
            <div v-if="$props.userId == currentUserId"><button @click="showReviewEdit = !showReviewEdit" class="ml-3">編集</button><button v-on:click="remove($props.id)" class="ml-3">削除</button></div>
          </div>
          <div v-if="showReviewEdit">
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
            <button @click="edit($props.id)" class="review-btn mt-5 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">レビューを編集</button>
            <button class="ml-4 flex mt-5 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded" @click="showReviewEdit = !showReviewEdit">閉じる</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import firebase from '@/plugins/firebase'
    import StarRating from 'vue-star-rating'
    var user = firebase.auth().currentUser
    
    export default Vue.extend({
    props: {
        score: {
            type: Number,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        good: {
            type: Number,
            required: true,
        },
        bad: {
            type: Number,
            required: true,
        },
        id: {
          type: String,
          required: true,
        },
        object: {
          type: String,
          required: true,
        }
    },
    mounted() {
      this.setupFirebase()
    },
    components: {
      StarRating,
    },
    data: () => ({
      review: {
        userName: '',
        score: 0,
        description: '',
        id: '',
        title: '',
        good: 0,
        bad: 0,
      },
      user: {
        uid: ''
      },
      StarRatingConfig: {
        starSize: 30,
        readOnly: true,
      },
      currentUserId: '',
      showReviewEdit: false,
    }),
    methods: {
          setupFirebase() {
              firebase.auth().onAuthStateChanged(user => {
                  if(user) {
                      this.currentUserId = user.uid;
                  } else {
                      this.currentInUserId = '';
                  }
              })
          },
          remove(id){
            const db = firebase.firestore()
            const docId = this.$route.params.id
            const object = db.collection(this.object).doc(docId)
            const dbItem = object.collection('reviews')
            dbItem
            .doc(id)
            .delete()
            .then(() => {
              object.get().then((doc) =>{
                object.update({
                  reviewCount: doc.data().reviewCount - 1
                })
                location.reload()
              })
            })
          },
          edit(id){
            const db = firebase.firestore()
            const docId = this.$route.params.id
            const dbItem = db.collection(this.object).doc(docId).collection('reviews')

            dbItem
            .doc(id)
            .update({ score: this.newScore, description: this.newReview, title: this.newTitle })
            .then(() => {  
              location.reload()
            })
          }
      }
    })
    </script>