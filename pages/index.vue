<template>
  <div class="w-full">
    <div>
      <Header />
      <main>
        <div class="container mx-auto mt-10">
              <SubHeading class="float-left"  title="Campaign" subtitle="注目のキャンペーン" detail=true />
              <nuxt-link :to="`/campaign`" class="underline text-xl float-right pt-20 hidden md:block">＋もっと見る</nuxt-link>
              <div class="md:flex flex-nowrap overflow-x-auto  container mx-auto my-auto">
                <div v-for="campaign in campaigns.slice(0, 6)" :key="campaign.index">
                    <nuxt-link :to="`/campaign/${campaign.id}`">
                        <Campaign :campaign="campaign" />
                    </nuxt-link>
                </div>
                <nuxt-link :to="`/campaign`" class="my-12 mx-16 text-xl pt-20 underline md:hidden">＋もっと見る</nuxt-link>
            </div>
            <SubHeading class="float-left mt-10" title="Payment" subtitle="支払い方法" />
            <nuxt-link :to="`/payment`" class="underline text-xl float-right pt-20 hidden md:block mt-10">＋もっと見る</nuxt-link>
            <div class="container mx-auto">
              <div class="md:flex flex-nowrap overflow-x-auto  container mx-auto my-auto">
                <div v-for="payment in payments.slice(0, 6)" :key="payment.index">
                    <nuxt-link :to="`/payment/${payment.id}`">
                        <Payment :payment="payment" />
                    </nuxt-link>
                </div>
              </div>
              <nuxt-link :to="`/payment`" class="my-12 mx-16 text-xl pt-20 underline md:hidden">＋もっと見る</nuxt-link>
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
  components: {
  	Campaign,
    Header,
    Footer,
    SubHeading,
    Payment,
  },
  created() {
    this.$store.dispatch('campaigns/init')
    this.$store.dispatch('payments/init')
  },
  computed: {
      campaigns() {
        return this.$store.getters['campaigns/orderedCampaigns']
      },
      payments() {
        return this.$store.getters['payments/orderedPayments']
      }
    },
}
</script>

<style>
.bg{
  background-image: url("~@/assets/images/homeimage.jpeg");
  height: 600px;
}
</style>
