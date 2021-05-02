<template>
    <div>
    <Header />
    <div class="relative items-center justify-center">
        <h1 class="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">人気コスメ</h1>
        <div class="lg:flex items-center container mx-auto my-auto">
            <div v-for="item in items" :key="item.index">
                <nuxt-link :to="`/item/${item.docId}`">
                    <Item
                    :image="item.image"
                    :name="item.name"
                    :price="item.price"
                    :description="item.description"
                    :brand="item.brand"
                    :score="item.score"
                    />
                </nuxt-link>
            </div>
        </div>
    </div>
    </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import firebase from '@/plugins/firebase'
import Item from "@/components/items/Item.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
 
export default Vue.extend({
  data: () => ({
    items: [],
  }),
  components: {
	Item,
    Header,
    Footer,
  },
  created() {
    const db = firebase.firestore()
    const dbItems = db.collection('items')
    dbItems.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
 
        const item = {
          image: data.image ? data.image : '/no-image.png',
          name: data.name ? data.name : '',
          price: data.price ? data.price : '-',
          description: data.description ? data.description : null,
          brand: data.brand ? data.brand : 'ノーブランド',
          docId: doc.id,
          score: data.score ? data.score : 0,
        }
        this.items.push(item)
      })
    })
  },
})
</script>