<template>
    <div>
    <Header />
    <div class="relative items-center justify-center">
      <SubHeading 
        title="Campaign"
        subtitle="キャンペーン一覧"
      />
        <div class="lg:flex items-center container mx-auto my-auto">
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
        <Footer />
    </div>
    </div>
</template>
 
<script>
import Vue from 'vue'
import firebase from '@/plugins/firebase'
import Campaign from "@/components/campaigns/Campaign.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SubHeading from "@/components/SubHeading.vue";
import PoimonButton from "@/components/common/PoimonButton.vue";
 
export default Vue.extend({
  data: () => ({
    campaigns: [],
  }),
  components: {
  	Campaign,
    Header,
    Footer,
    SubHeading,
    PoimonButton,
  },
  methods: {
      select() {
        console.log('aaa')
        location.reload()
      }
  },
  watch: {
        '$route' (to, from) {
            location.reload()
        }
    },
  created() {
    const db = firebase.firestore()
    let dbItems = db.collection('campaigns')
    if(this.$route.query.search){
        console.log(this.$route.query.search)
      dbItems = dbItems.where('tag', 'array-contains', this.$route.query.search)
    }
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
          tag: data.tag ? data.tag : null,
        }
        this.campaigns.push(campaign)
      })
    })
  }
})
</script>