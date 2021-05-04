<template>
    <div class="flex items-start w-screen">
        <div class="flex-shrink-0">
          <div class="inline-block relative">
            <div class="relative w-16 h-16 rounded-full overflow-hidden">
              <img v-if="$props.score > 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/goodface.png"" alt="Profile picture">
              <img v-if="$props.score == 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/normalface.png"" alt="Profile picture">
              <img v-if="$props.score < 3" class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="~/assets/images/unsatisfiedface.png"" alt="Profile picture">
              <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
            </div>
          </div>
        </div>
        <div class="ml-6">
          <p class="flex items-baseline">
            <span class="text-gray-600 font-bold">{{ $props.userName }}</span>
          </p>
          <div class="flex items-center mt-1">
            <StarRating
              :rating="$props.score"
              :star-size="20"
              :read-only="StarRatingConfig.readOnly"
            />
          </div>
          <div class="mt-3">
            <span class="font-bold">{{ $props.title }}</span>
            <p class="mt-1">{{ $props.description }}</p>
          </div>
          <div class="flex items-right justify-between mt-4 mb-7 text-sm text-gray-600 fill-current">
            <div class="flex items-center">
              <button class="flex items-center ml-6">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z"/></svg>
                <span class="ml-2"> {{ $props.good }}</span>
              </button>
              <button class="flex items-center ml-4">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z"/></svg>
                <span class="ml-2">{{ $props.bad }}</span>
              </button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import firebase from '@/plugins/firebase'
    import StarRating from 'vue-star-rating'
    
    export default Vue.extend({
    props: {
        score: {
            type: Number,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        good: {
            type: Number,
            required: true,
        },
        bad: {
            type: Number,
            required: true,
        },
    },
      components: {
        StarRating,
      },
      data: () => ({
        review: {
          userName: '',
          score: 0,
          description: '',
          id: '',
          title: '',
          good: 0,
          bad: 0,
        },
        StarRatingConfig: {
          starSize: 30,
          readOnly: true,
        },
      }),
    })
    </script>