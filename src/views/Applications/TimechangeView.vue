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
  {
    id: 1,
    beginWork: "2025-07-01T09:00:00",
    endWork: "2025-07-01T18:00:00",
    beginBreak: "2025-07-01T12:00:00",
    endBreak: "2025-07-01T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 30
  },
  {
    id: 2,
    beginWork: "2025-07-02T09:15:00",
    endWork: "2025-07-02T18:15:00",
    beginBreak: "2025-07-02T12:15:00",
    endBreak: "2025-07-02T13:15:00",
    lateness: 1,
    leaveEarly: 0,
    outing: 0,
    overWork: 45
  },
  {
    id: 3,
    beginWork: "2025-07-03T09:00:00",
    endWork: "2025-07-03T18:00:00",
    beginBreak: "2025-07-03T12:00:00",
    endBreak: "2025-07-03T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 1,
    overWork: 60
  },
  {
    id: 4,
    beginWork: "2025-07-04T09:10:00",
    endWork: "2025-07-04T18:00:00",
    beginBreak: "2025-07-04T12:00:00",
    endBreak: "2025-07-04T13:00:00",
    lateness: 1,
    leaveEarly: 0,
    outing: 0,
    overWork: 20
  },
  {
    id: 5,
    beginWork: "2025-07-05T09:00:00",
    endWork: "2025-07-05T17:45:00",
    beginBreak: "2025-07-05T12:15:00",
    endBreak: "2025-07-05T13:15:00",
    lateness: 0,
    leaveEarly: 1,
    outing: 0,
    overWork: 15
  },
  {
    id: 6,
    beginWork: "2025-07-06T09:00:00",
    endWork: "2025-07-06T18:30:00",
    beginBreak: "2025-07-06T12:00:00",
    endBreak: "2025-07-06T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 90
  },
  {
    id: 7,
    beginWork: "2025-07-07T08:45:00",
    endWork: "2025-07-07T18:00:00",
    beginBreak: "2025-07-07T12:00:00",
    endBreak: "2025-07-07T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 30
  },
  {
    id: 8,
    beginWork: "2025-07-08T09:30:00",
    endWork: "2025-07-08T18:00:00",
    beginBreak: "2025-07-08T12:30:00",
    endBreak: "2025-07-08T13:30:00",
    lateness: 1,
    leaveEarly: 0,
    outing: 1,
    overWork: 60
  },
  {
    id: 9,
    beginWork: "2025-07-09T09:00:00",
    endWork: "2025-07-09T18:00:00",
    beginBreak: "2025-07-09T12:00:00",
    endBreak: "2025-07-09T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 0
  },
  {
    id: 10,
    beginWork: "2025-07-10T09:00:00",
    endWork: "2025-07-10T17:30:00",
    beginBreak: "2025-07-10T12:00:00",
    endBreak: "2025-07-10T13:00:00",
    lateness: 0,
    leaveEarly: 1,
    outing: 0,
    overWork: 0
  },
  {
    id: 11,
    beginWork: "2025-07-11T09:05:00",
    endWork: "2025-07-11T18:05:00",
    beginBreak: "2025-07-11T12:05:00",
    endBreak: "2025-07-11T13:05:00",
    lateness: 1,
    leaveEarly: 0,
    outing: 0,
    overWork: 65
  },
  {
    id: 12,
    beginWork: "2025-07-12T09:00:00",
    endWork: "2025-07-12T18:00:00",
    beginBreak: "2025-07-12T12:00:00",
    endBreak: "2025-07-12T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 30
  },
  {
    id: 13,
    beginWork: "2025-07-13T09:00:00",
    endWork: "2025-07-13T18:00:00",
    beginBreak: "2025-07-13T12:00:00",
    endBreak: "2025-07-13T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 60
  },
  {
    id: 14,
    beginWork: "2025-07-14T09:20:00",
    endWork: "2025-07-14T18:00:00",
    beginBreak: "2025-07-14T12:00:00",
    endBreak: "2025-07-14T13:00:00",
    lateness: 1,
    leaveEarly: 0,
    outing: 0,
    overWork: 10
  },
  {
    id: 15,
    beginWork: "2025-07-15T08:50:00",
    endWork: "2025-07-15T18:00:00",
    beginBreak: "2025-07-15T12:00:00",
    endBreak: "2025-07-15T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 70
  },
  {
    id: 16,
    beginWork: "2025-07-16T09:00:00",
    endWork: "2025-07-16T18:00:00",
    beginBreak: "2025-07-16T12:00:00",
    endBreak: "2025-07-16T13:00:00",
    lateness: 0,
    leaveEarly: 1,
    outing: 0,
    overWork: 0
  },
  {
    id: 17,
    beginWork: "2025-07-17T09:00:00",
    endWork: "2025-07-17T18:00:00",
    beginBreak: "2025-07-17T12:00:00",
    endBreak: "2025-07-17T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 1,
    overWork: 45
  },
  {
    id: 18,
    beginWork: "2025-07-18T09:10:00",
    endWork: "2025-07-18T18:00:00",
    beginBreak: "2025-07-18T12:00:00",
    endBreak: "2025-07-18T13:00:00",
    lateness: 1,
    leaveEarly: 0,
    outing: 0,
    overWork: 20
  },
  {
    id: 19,
    beginWork: "2025-07-19T09:00:00",
    endWork: "2025-07-19T18:00:00",
    beginBreak: "2025-07-19T12:00:00",
    endBreak: "2025-07-19T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 60
  },
  {
    id: 20,
    beginWork: "2025-07-20T09:00:00",
    endWork: "2025-07-20T18:00:00",
    beginBreak: "2025-07-20T12:00:00",
    endBreak: "2025-07-20T13:00:00",
    lateness: 0,
    leaveEarly: 0,
    outing: 0,
    overWork: 30
  }
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
