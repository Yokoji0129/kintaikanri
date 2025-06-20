<script setup>
import ApplyBtn from "../../components/ApplyBtn.vue";
import NavList from "../../components/NavList.vue";
import ReqestTime from "../../components/ReqestTime.vue";
import RequestReason from "../../components/RequestReason.vue";
import SelectShift from "../../components/SelectShift.vue";
import WorkControlPanel from "../../components/WorkControlPanel.vue";
import { ref, watch } from "vue";

// シフト(仮)データ
const shifts = ref([
  { id: 1, start: "09:00", end: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  { id: 2, start: "10:00", end: "19:00", breakStart: "14:00", breakEnd: "15:00" },
  { id: 3, start: "12:00", end: "21:00", breakStart: "16:00", breakEnd: "17:00" },
]);

const selectedShiftId = ref(null); // シフト選択変数
const startTime = ref(""); // 始業時刻
const endTime = ref(""); // 就業時刻
const breakStartTime = ref(""); // 休憩時間
const breakEndTime = ref(""); // 休憩時間
const reasonText = ref(""); //申請理由テキスト

// selectedShiftIdが変わったときに自動で反映
watch(selectedShiftId, (newId) => {
  const selected = shifts.value.find((s) => s.id === newId);
  console.log(selected);
  if (selected) {
    startTime.value = selected.start;
    endTime.value = selected.end;
    breakStartTime.value = selected.breakStart;
    breakEndTime.value = selected.breakEnd;
  } else {
    startTime.value = "";
    endTime.value = "";
    breakStartTime.value = ""
    breakEndTime.value = "";
  }
});

//時間変更申請関数
const TimeChangePost = () => {
  console.log(
    `時間変更申請から押した。  始業時刻: ${startTime.value},就業時刻: ${endTime.value},休憩開始時刻: ${breakStartTime.value},休憩終了時刻: ${breakEndTime.value},申請理由: ${reasonText.value}`
  );
};
</script>


<!--時間変更申請ページ-->
<template>
  <div class="flex h-screen text-base">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">
      <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">時間変更申請</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">
        <!-- 対象シフト選択 -->
        <SelectShift :shifts="shifts" v-model:selectedShiftId="selectedShiftId" />

        <!-- 始業,就業,休憩時間-->
        <WorkControlPanel
          v-if="selectedShiftId"
          v-model:startTime="startTime"
          v-model:endTime="endTime"
          v-model:breakStartTime="breakStartTime"
          v-model:breakEndTime="breakEndTime"
        />

        <!-- 申請理由 -->
        <RequestReason v-model:reasonText="reasonText" />

        <!-- 申請時間 -->
        <ReqestTime
          v-if="selectedShiftId"
          :startTime="startTime"
          :endTime="endTime"
          :breakStartTime="breakStartTime"
          :breakEndTime="breakEndTime"
        />

        <!-- 申請ボタン -->
        <ApplyBtn :TimeChangePost="TimeChangePost" />
      </div>
    </main>
  </div>
</template>
