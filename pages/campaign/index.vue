<template>
    <div>
    <Header />
    <div class="relative items-center container mx-auto my-auto">
        <SubHeading 
          title="Campaign"
          subtitle="キャンペーン一覧"
        />
        <div class="lg:flex flex-wrap items-center">
            <div v-for="campaign in campaigns" :key="campaign.index">
                <nuxt-link :to="`/campaign/${campaign.id}`">
                    <Campaign :campaign="campaign" />
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
import Campaign from "@/components/campaigns/Campaign.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SubHeading from "@/components/SubHeading.vue";
import PoimonButton from "@/components/common/PoimonButton.vue";
 
export default {
  components: {
  	Campaign,
    Header,
    Footer,
    SubHeading,
    PoimonButton,
  },
  watch: {
        '$route' (to, from) {
            location.reload()
        }
    },
  created() {
    this.$store.dispatch('campaigns/search')
  },
  computed: {
      campaigns() {
        return this.$store.getters['campaigns/orderedCampaigns']
      },
    },
}
</script>