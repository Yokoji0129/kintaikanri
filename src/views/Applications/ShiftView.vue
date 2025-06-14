<script setup>
import ApplyBtn from "../../components/ApplyBtn.vue";
import NavList from "../../components/NavList.vue";
import RequestReasonBtn from "../../components/RequestReason.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const reasonText = ref("") //申請理由テキスト

const ShiftTestBtn = () => {
  console.log("シフト申請から押した", reasonText.value)
}
</script>

<template>
  <div class="flex h-screen text-base">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">
      <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">シフト登録</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">
        <!-- 始業-->
        <div>
          <label class="block font-semibold md:mb-2">始業時刻</label>
          <input
            type="time"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>

        <!--終業-->
        <div>
          <label class="block font-semibold md:mb-2">終業時刻</label>
          <input
            type="time"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>

        <!-- 休憩時間 -->
        <div>
          <label class="block font-semibold md:mb-2">休憩時間</label>
          <input
            type="time"
            value="01:00"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>

        <!-- 申請理由 -->
         <RequestReasonBtn v-model="reasonText" />

        <!-- 申請時間 -->
        <div>
          <label class="block font-semibold md:mb-2">申請時間</label>
          <input
            type="text"
            class="w-full p-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
            value="自動計算されたもの表示させる"
            readonly
          />
        </div>
        <ApplyBtn :ShiftTestBtn="ShiftTestBtn" />
      </div>
    </main>
  </div>
</template>
