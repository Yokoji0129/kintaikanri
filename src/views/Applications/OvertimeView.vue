<script setup>
import { ref } from "vue";
import ApplyBtn from "../../components/ApplyBtn.vue";
import NavList from "../../components/NavList.vue";
import RequestReason from "../../components/RequestReason.vue";

const reasonText = ref(""); //申請理由テキスト
const overTimeStart = ref("")//残業開始
const overTimeEnd = ref("")//残業終了

//残業申請関数
const overTimePost = () => {
  console.log(`残業申請から押した。 残業開始時刻: ${overTimeStart.value} 残業終了時刻${overTimeEnd.value} 申請理由: ${reasonText.value}`);
};
</script>

<!--残業申請ページ-->
<template>
  <div class="flex h-screen">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">
      <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">残業申請</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">
        <!--残業開始時刻-->
        <div>
          <label class="block font-semibold md:mb-2">残業開始時刻</label>
          <input
            type="time"
            v-model="overTimeStart"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>
        <!--残業終了時刻-->
        <div>
          <label class="block font-semibold md:mb-2">残業終了時刻</label>
          <input
            type="time"
            v-model="overTimeEnd"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>

        <!--申請理由-->
        <RequestReason v-model:reasonText="reasonText" />

        <!--申請ボタン-->
        <ApplyBtn :overTimePost="overTimePost" />
      </div>
    </main>
  </div>
</template>