<template>
    <div class="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 w-64">
        <!-- Card Image -->
        <img class="overflow-hidden w-80 h-52" style="object-fit: contain;" :src="$props.image" alt="" />
        <!-- Card Content -->
        <div class="p-4">
            <div class="font-medium text-gray-500 text-sm my-2 uppercase">{{ $props.brand }}</div>
            <div class="font-medium text-gray-700 text-base my-2 uppercase h-10">{{ $props.name }}</div>
            <div class="item-price">{{ $props.price }}円(税込)</div>
            <div class="mt-5">
                <a href="" class="hover:bg-gray-700 rounded-full py-2 px-3 font-semibold hover:text-white bg-gray-400 text-gray-100">詳細</a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
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
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
    },
  })
</script>