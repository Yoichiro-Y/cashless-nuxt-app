<template>
  <div class="w-full">
    <div>
      <Header />
      <main>
        <div class="container mx-auto mt-10">
              <SubHeading 
              title="Campaign"
              subtitle="開催中のオトクなキャンペーン"
              />
              <div class="lg:flex wrap flex-wrap content-center  container mx-auto my-auto">
                <div v-for="campaign in campaigns" :key="campaign.index">
                    <nuxt-link :to="`/campaign/${campaign.docId}`">
                        <Campaign
                        :image="campaign.image"
                        :payment="campaign.payment"
                        :score="campaign.score"
                        :rate="campaign.rate"
                        :limit="campaign.limit"
                        :start="campaign.start"
                        :end="campaign.end"
                        />
                    </nuxt-link>
                </div>
            </div>
            <SubHeading 
              title="Payment"
              subtitle="支払い方法"
              class="mt-10"
            />
            <div class="container mx-auto">
              <div class="lg:flex items-center container mx-auto my-auto">
                <div v-for="payment in payments" :key="payment.index">
                    <nuxt-link :to="`/payment/${payment.docId}`">
                        <Payment
                        :image="payment.image"
                        :name="payment.name"
                        :annualFee="payment.annualFee"
                        :description="payment.description"
                        :category="payment.category"
                        :score="payment.score"
                        />
                    </nuxt-link>
                </div>
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
import firebase from '@/plugins/firebase'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Search from "@/components/Search.vue";
import SubHeading from "@/components/SubHeading.vue";
import Campaign from "@/components/campaigns/Campaign.vue";
import Payment from "@/components/payments/Payment.vue";
import { defineComponent } from '@nuxtjs/composition-api'

export default {
  data: () => ({
    campaigns: [],
    payments: [],
  }),
  components: {
  	Campaign,
    Header,
    Footer,
    SubHeading,
    Payment,
  },
  created() {
    const db = firebase.firestore()
    let dbItems = db.collection('campaigns').where('end', '>', this.$dayjs().format('YYYY-MM-DD'))
    dbItems.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
 
        const campaign = {
          image: data.image ? data.image : '/no-image.png',
          score: data.score ? data.score : 0,
          payment: data.payment ? data.payment : '',
          docId: doc.id,
          rate: data.rate ? data.rate : 0,
          limit: data.limit ? data.limit : 0,
          start: data.start ? data.start : null,
          end: data.end ? data.end : null,
        }
        this.campaigns.push(campaign)
      })
    })
    dbItems = db.collection('payments')
    if(this.$route.query.category){
      dbItems = dbItems.where('category', '==', this.$route.query.category)
    }
    dbItems.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
 
        const payment = {
          image: data.image ? data.image : '/no-image.png',
          name: data.name ? data.name : '',
          annualFee: data.annualFee ? data.annualFee : 0,
          description: data.description ? data.description : null,
          docId: doc.id,
          score: data.score ? data.score : 0,
        }
        this.payments.push(payment)
      })
    })
  },
}
</script>

<style>
.bg{
  background-image: url("~@/assets/images/homeimage.jpeg");
  height: 600px;
}
</style>
