<script setup>
import ApplyBtn from "../../components/ApplyBtn.vue";
import NavList from "../../components/NavList.vue";
import RequestReasonBtn from "../../components/RequestReason.vue";
import { ref, watch } from "vue";

// シフト(仮)データ
const shifts = ref([
  { id: 1, start: "09:00", end: "18:00", break: "01:00" },
  { id: 2, start: "10:00", end: "19:00", break: "01:00" },
  { id: 3, start: "12:00", end: "21:00", break: "01:00" },
]);

const selectedShiftId = ref(null); // シフト選択変数
const startTime = ref(""); // 始業時刻
const endTime = ref(""); // 就業時刻
const breakTime = ref(""); // 休憩時間
const reasonText = ref("") //申請理由テキスト

// selectedShiftIdが変わったときに自動で反映
watch(selectedShiftId, (newId) => {
  const selected = shifts.value.find((s) => s.id === newId);
  console.log(selected);
  if (selected) {
    startTime.value = selected.start;
    endTime.value = selected.end;
    breakTime.value = selected.break;
  } else {
    startTime.value = "";
    endTime.value = "";
    breakTime.value = "";
  }
});

const TimeTestBtn = () => {
  console.log("時間変更申請から押した", reasonText.value)
}
</script>


<!--時間変更申請ページ-->
<template>
  <div class="flex h-screen text-base">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">
      <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">時間変更申請</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">
        <!-- 対象シフト選択 -->
        <div>
          <label class="block font-semibold md:mb-2">対象シフト選択</label>
          <select
            v-model="selectedShiftId"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          >
            <option disabled value="">選択してください</option>
            <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
              {{ shift.start }} - {{ shift.end }} (休憩) {{ shift.break }}
            </option>
          </select>
        </div>

        <!-- 始業時刻 -->
        <div>
          <label class="block font-semibold md:mb-2">始業時刻</label>
          <input
            type="time"
            v-model="startTime"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>

        <!-- 終業時刻 -->
        <div>
          <label class="block font-semibold md:mb-2">終業時刻</label>
          <input
            type="time"
            v-model="endTime"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          />
        </div>

        <!-- 休憩時間 -->
        <div>
          <label class="block font-semibold md:mb-2">休憩時間</label>
          <input
            type="time"
            v-model="breakTime"
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
            readonly
          />
        </div>

        <!-- 申請ボタン -->
        <ApplyBtn :TimeTestBtn="TimeTestBtn" />
      </div>
    </main>
  </div>
</template>
