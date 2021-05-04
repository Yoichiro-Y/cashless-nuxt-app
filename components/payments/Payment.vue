<template>
    <div class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 w-64">
        <!-- Card Image -->
        <img class="overflow-hidden w-80 h-52" style="object-fit: contain;" :src="$props.image" alt="" />
        <!-- Card Content -->
        <div class="p-4">
            <div class="font-medium text-gray-700 text-base my-2 uppercase h-10">{{ $props.name }}</div>
            <StarRating
            v-model="item.score"
            :star-size="StarRatingConfig.starSize"
            :read-only="StarRatingConfig.readOnly"
            />
            <div class="item-price"></div>
            <div class="mt-5">
                <a href="" class="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100">詳細</a>
            </div>
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
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    components: {
      StarRating,
    },
    data: () => ({
      item: {
        name: '',
        image: '',
        score: 0,
        description: '',
        review: '',
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