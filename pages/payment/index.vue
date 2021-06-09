<template>
    <div>
    <Header />
        <div class="relative items-center container mx-auto my-auto">
          <SubHeading  title="Payment" subtitle="決済方法一覧" />
          <div class="lg:flex flex-wrap items-center container mx-auto my-auto">       
            <div v-for="payment in payments" :key="payment.index">
                <nuxt-link :to="`/payment/${payment.id}`">
                    <Payment :payment="payment" />
                </nuxt-link>
            </div>
        </div>
    </div>
    <Footer />
    </div>
</template>
 
<script>
import Vue from 'vue'
import firebase from '@/plugins/firebase'
import Payment from "@/components/payments/Payment.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SubHeading from "@/components/SubHeading.vue";
import PoimonButton from "@/components/common/PoimonButton.vue";
 
export default {
  components: {
  	Payment,
    Header,
    Footer,
    SubHeading,
    PoimonButton,
  },
  created() {
    this.$store.dispatch('payments/init')
    if(this.$route.query.category){
      payments = payments.where('category', '==', this.$route.query.category)
    }
  },
  computed: {
    payments() {
      return this.$store.getters['payments/orderedPayments']
    }
  }
}
</script>