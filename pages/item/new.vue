<template>
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      商品名<input type="text" v-model="item.name" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      ブランド<input type="text" v-model="item.brand" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      参考価格<input type="text" v-model="item.price" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      紹介文<textarea type="textarea" v-model="item.description" class="block border border-grey-light w-full p-3 rounded mb-4" />
      <br />
      <div v-if="item.image">
        <img class="preview-image" :src="item.image" alt="" />
      </div>
      <div class="entry-input-row">
        <span class="enrty-label">画像<br /></span
        ><input v-if="reset" @change="upload" type="file" />
      </div>
      <button @click="entryItem()" class="border">登録</button>
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
      item: {
        name: '',
        brand: '',
        price: '',
        description: '',
        image: '',
      },
      errorMessage: '',
      reset: true,
      entryDocId: '',
    }),
    methods: {
      entryItem() {
        this.errorMessage = ''
   
        const db = firebase.firestore()
        const dbItems = db.collection('items')
        dbItems
          .add({
            name: this.item.name,
            brand: this.item.brand,
            price: this.item.price,
            description: this.item.description,
            image: this.item.image,
          })
          .then((ref) => {
            this.entryDocId = ref.id
            this.item.name = ''
            this.item.brand = ''
            this.item.price = ''
            this.item.description = ''
            this.item.image = ''
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
            this.item.image = url
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