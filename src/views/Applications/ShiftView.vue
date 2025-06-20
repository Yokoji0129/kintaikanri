<script setup>
import { ref } from "vue";
import NavList from "../../components/NavList.vue";
import WorkControlPanel from "../../components/WorkControlPanel.vue";
import RequestReason from "../../components/RequestReason.vue";
import ReqestTime from "../../components/ReqestTime.vue";
import ApplyBtn from "../../components/ApplyBtn.vue";

const startTime = ref(""); // 始業時刻
const endTime = ref(""); // 就業時刻
const breakStartTime = ref(""); // 休憩時刻
const breakEndTime = ref(""); // 休憩時刻
const reasonText = ref(""); //申請理由テキスト

//シフト申請関数
const shiftPost = () => {
  console.log(
    `シフト申請から押した。 始業時刻: ${startTime.value},就業時刻: ${endTime.value},休憩開始時刻: ${breakStartTime.value},休憩終了時刻: ${breakEndTime.value},申請理由: ${reasonText.value}`
  );
};
</script>

<template>
  <div class="flex h-screen text-base">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">
      <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">シフト登録</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">
        <!-- 始業,就業,休憩時刻-->
        <WorkControlPanel
          v-model:startTime="startTime"
          v-model:endTime="endTime"
          v-model:breakStartTime="breakStartTime"
          v-model:breakEndTime="breakEndTime"
        />

        <!-- 申請理由 -->
        <RequestReason v-model:reasonText="reasonText" />

        <!-- 申請時刻 -->
        <ReqestTime
          :startTime="startTime"
          :endTime="endTime"
          :breakStartTime="breakStartTime"
          :breakEndTime="breakEndTime"
        />

        <!--申請,戻るボタン-->
        <ApplyBtn :shiftPost="shiftPost" />
      </div>
    </main>
  </div>
</template>
