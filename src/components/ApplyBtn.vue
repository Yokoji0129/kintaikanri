<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  ShiftTestBtn: Function,
  TimeTestBtn: Function,
})

// ルートによって押されたときの動作を切り替え
const handleClick = () => {
  if (route.path === "/shift") {
    props.ShiftTestBtn && props.ShiftTestBtn();
  } else if (route.path === "/timechange") {
    props.TimeTestBtn && props.TimeTestBtn();
  } else {
    console.log("不明なページです");
  }
};
</script>

<template>
  <!-- 登録ボタン -->
  <div class="text-right space-x-5">
    <router-link to="/application">
      <button
        class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-25 cursor-pointer"
      >
        戻る
      </button>
    </router-link>
    <button
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-25 cursor-pointer"
      @click="handleClick"
    >
      登録
    </button>
  </div>
</template>