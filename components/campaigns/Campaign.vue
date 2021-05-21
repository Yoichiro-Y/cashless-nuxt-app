<template>
    <div class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 w-64">
        <!-- Card Image -->
        <img class="overflow-hidden w-80 h-52" style="object-fit: contain;" :src="$props.image" alt="" />
        <!-- Card Content -->
        <div class="p-4">
            <div class="font-medium text-gray-500 text-sm my-2">{{ $props.payment }}</div>
            <div class="flex">
                <span class="flex">注目度：</span>
                <StarRating
                class="flex"
                :star-size="StarRatingConfig.starSize"
                :read-only="StarRatingConfig.readOnly"
                :rating="$props.score"
                />
            </div>
            <span class="font-medium text-gray-700 text-base my-2 uppercase h-10">{{ $props.start }} ~ {{ $props.end }}</span>
            <div>最大還元率{{ $props.rate }}%</div>
            <div v-if="$props.limit == 99999">還元上限なし</div>
            <div v-else>還元上限{{ $props.limit }}P</div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import StarRating from 'vue-star-rating'

export default Vue.extend({
    props: {
      image: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      limit: {
        type: Number,
        required: true,
      },
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    components: {
      StarRating,
    },
    data: () => ({
      campaign: {
        image: '',
        score: 0,
        payment: '',
        rate: 0,
        limit: 0,
        start: null,
        date: null,
      },
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