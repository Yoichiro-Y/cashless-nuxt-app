<template>
    <div>
    <Header />
    <div class="relative items-center justify-center">
        <SubHeading 
         title="Payment"
         subtitle="キャッシュレス決済一覧"
        />
        <PoimonButton
          class="ml-14"
          text="すべて"
        />
        <PoimonButton
          text="クレジットカード"
        />
        <PoimonButton
          text="QRコード決済"
        />
        <div class="lg:flex items-center container mx-auto my-auto">
            <div v-for="payment in payments" :key="payment.index">
                <nuxt-link :to="`/payment/${payment.docId}`">
                    <Payment
                    :image="payment.image"
                    :name="payment.name"
                    :annualFee="payment.price"
                    :description="payment.description"
                    :category="payment.category"
                    :score="payment.score"
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
import Payment from "@/components/payments/Payment.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SubHeading from "@/components/SubHeading.vue";
import PoimonButton from "@/components/common/PoimonButton.vue";
 
export default Vue.extend({
  data: () => ({
    payments: [],
  }),
  components: {
  	Payment,
    Header,
    Footer,
    SubHeading,
    PoimonButton,
  },
  created() {
    const db = firebase.firestore()
    const dbItems = db.collection('payments')
    dbItems.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
 
        const payment = {
          image: data.image ? data.image : '/no-image.png',
          name: data.name ? data.name : '',
          price: data.price ? data.price : '-',
          description: data.description ? data.description : null,
          docId: doc.id,
          score: data.score ? data.score : 0,
        }
        this.payments.push(payment)
      })
    })
  },
})
</script>