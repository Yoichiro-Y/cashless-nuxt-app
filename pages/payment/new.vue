<template>
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      名称<input type="text" v-model="payment.name" class="block border border-grey-light w-full p-3 rounded mb-4" />
      カテゴリ<input type="text" v-model="payment.category" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      年会費<input type="text" v-model="payment.annualFee" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      紹介文<textarea type="textarea" v-model="payment.description" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      <div v-if="payment.image">
        <img class="preview-image" :src="payment.image" alt="" />
      </div>
      <div class="entry-input-row">
        <span class="enrty-label">画像<br /></span
        ><input v-if="reset" @change="upload" type="file" />
      </div>
      <button @click="entryPayment()" class="border">登録</button>
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
      payment: {
        name: '',
        annualFee: '',
        description: '',
        image: '',
        category: ''
      },
      errorMessage: '',
      reset: true,
      entryDocId: '',
    }),
    methods: {
      entryPayment() {
        this.errorMessage = ''
   
        const db = firebase.firestore()
        const dbItems = db.collection('payments')
        dbItems
          .add({
            name: this.payment.name,
            annualFee: this.payment.annualFee,
            description: this.payment.description,
            image: this.payment.image,
            category: this.payment.category,
            score: 0,
            reviewCount: 0,
          })
          .then((ref) => {
            this.entryDocId = ref.id
            this.payment.name = ''
            this.payment.annualFee = ''
            this.payment.description = ''
            this.payment.image = ''
            this.payment.category = ''
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
            this.payment.image = url
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