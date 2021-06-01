<template>
    <div class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-16 w-64">
        <!-- Card Image -->
        <img class="overflow-hidden w-80 h-52" style="object-fit: contain;" :src="payment.image" alt="" />
        <!-- Card Content -->
        <div class="p-4">
            <div class="font-medium text-gray-700 text-base my-2 h-10">{{ payment.name }}</div>
            <div class="flex">
                <span class="flex">注目度：</span>
                <StarRating
                class="flex"
                :star-size="StarRatingConfig.starSize"
                :read-only="StarRatingConfig.readOnly"
                :rating="payment.score"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import StarRating from 'vue-star-rating'

export default Vue.extend({
    props: {
      payment: {
        type: Object,
        required: true,
      }
    },
    components: {
      StarRating,
    },
    data: () => ({
      entryDocId: '',
      errorMessage: '',
      reset: true,
      newScore: 0,
      newReview: '',
      showReviewInput: false,
      StarRatingConfig: {
        starSize: 15,
        readOnly: true,
      },
    }),
  })
</script>