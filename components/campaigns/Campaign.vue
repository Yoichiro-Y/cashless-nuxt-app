<template>
    <div class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-16 w-64">
        <!-- Card Image -->
        <img class="overflow-hidden w-80 h-52" style="object-fit: contain;" :src="campaign.image" alt="" />
        <!-- Card Content -->
        <div class="p-4">
            <div class="font-medium text-gray-500 text-sm my-2">{{ campaign.payment }}</div>
            <div class="flex">
                <span class="flex">注目度：</span>
                <StarRating
                class="flex"
                :star-size="StarRatingConfig.starSize"
                :read-only="StarRatingConfig.readOnly"
                :rating="campaign.score"
                />
            </div>
            <span class="font-medium text-gray-700 text-base my-2 uppercase h-10">{{ campaign.start }} ~ {{ campaign.end }}</span>
            <div>最大還元率{{ campaign.rate }}%</div>
            <div v-if="campaign.limit == 99999">還元上限なし</div>
            <div v-else>還元上限{{ campaign.limit }}P</div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import StarRating from 'vue-star-rating'

export default Vue.extend({
    props: {
      campaign: {
        type: Object,
        required: true,
      },
    },
    components: {
      StarRating,
    },
    data: () => ({
      StarRatingConfig: {
        starSize: 15,
        readOnly: true,
      },
    }),
  })
</script>