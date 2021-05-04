<template>
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      決済<input type="text" v-model="campaign.payment" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      注目度<input type="text" v-model="campaign.score" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      開始日<input type="date" v-model="campaign.start" class="block border border-grey-light w-full p-3 rounded mb-4" />
      終了日<input type="date" v-model="campaign.end" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      最大還元率<input type="integer" v-model="campaign.rate" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      還元上限<input type="integer" v-model="campaign.limit" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      対象店舗<input type="text" v-model="campaign.store" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      <div v-if="campaign.image">
        <img class="preview-image" :src="campaign.image" alt="" />
      </div>
      <div class="entry-input-row">
        <span class="enrty-label">画像<br /></span
        ><input v-if="reset" @change="upload" type="file" />
      </div>
      <button @click="entryCampaign()" class="border">登録</button>
      <br /><br />
      <div v-if="entryDocId">
        FirestoreにDocId:{{ entryDocId }}で登録しました。
      </div>
      <div v-if="errorMessage">エラーメッセージ:{‌{ errorMessage }}</div>
    </div>
  </template>
   
  <script lang="ts">
  import Vue from 'vue'
  import firebase from '@/plugins/firebase'
   
  export default Vue.extend({
    data: () => ({
      campaign: {
        payment: '',
        score: 0,
        rate: 0,
        limit: 0,
        image: '',
        start: null,
        end: null,
        store: ''
      },
      errorMessage: '',
      reset: true,
      entryDocId: '',
    }),
    methods: {
      entryCampaign() {
        this.errorMessage = ''
   
        const db = firebase.firestore()
        const dbItems = db.collection('campaigns')
        dbItems
          .add({
            payment: this.campaign.payment,
            score: this.campaign.score,
            rate: this.campaign.rate,
            limit: this.campaign.limit,
            image: this.campaign.image,
            reviewCount: 0,
            store: this.campaign.store,
            start: this.campaign.start,
            end: this.campaign.end,
          })
          .then((ref) => {
            this.entryDocId = ref.id
            this.campaign.payment = ''
            this.campaign.score = 0
            this.campaign.rate = 0
            this.campaign.limit = 0
            this.campaign.image = ''
            this.campaign.start = null
            this.campaign.end = null
            this.campaign.store = ''
          })
          .catch((errorMessage) => {
            this.errorMessage = errorMessage
          })
      },
     upload(e) {
      const file = e.target.files[0]
 
      if (!file.type.includes('image')) {
        this.errorMessage = '画像を指定してください'
        this.inputFileReset()
        return
      }
 
      const storageRef = firebase.storage().ref(file.name)
      storageRef.put(file).then(() => {
        firebase
          .storage()
          .ref(file.name)
          .getDownloadURL()
          .then((url) => {
            this.campaign.image = url
          })
          .catch((err) => {
            this.errorMessage = err
          })
      })
    },
    inputFileReset() {
      this.reset = false
      this.$nextTick(function () {
        this.reset = true
      })
    },
    },
  })
  </script>
   
  <style></style>