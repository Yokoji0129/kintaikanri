<script setup>
import NavList from "../components/NavList.vue";
import { ref } from "vue";

//表示切替（"shift" or "attendance"）
const viewType = ref("shift");

//今日の年月
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

//日数と開始曜日を計算
const firstDate = new Date(currentYear, currentMonth, 1);
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayOfWeek = firstDate.getDay();

//空白セルと日数
const emptyCells = Array.from({ length: firstDayOfWeek });
const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//仮データ
const shiftData = {
  5: { start: "09:00", end: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  20: { start: "10:00", end: "18:00", breakStart: "12:00", breakEnd: "13:00" },
};
const attendanceData = {
  5: { start: "09:02", end: "18:10", breakStart: "12:05", breakEnd: "13:00" },
  20: { start: "10:01", end: "17:45", breakStart: "12:00", breakEnd: "13:00" },
};

//データ表示切替
const label = (day) =>
  viewType.value === "shift" ? shiftData[day] : attendanceData[day];

//月名
const monthLabel = `${currentYear}年${currentMonth + 1}月`;
</script>

<template>
  <div class="flex h-screen">
    <NavList />

    <main class="flex-1 p-0 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:p-6">
      <h1 class="text-xl lg:text-2xl font-bold mb-4 text-center">
        📅{{ monthLabel }}
      </h1>

      <!-- タブ切替 -->
      <div
        class="m-4 flex space-x-4 text-base lg:text-xl lg:mb-4 lg:mr-0 lg:ml-0"
      >
        <button
          @click="viewType = 'shift'"
          class="w-1/2 cursor-pointer font-semibold px-4 py-2"
          :class="
            viewType === 'shift'
              ? 'bg-green-500 text-white  rounded'
              : 'bg-white border rounded'
          "
        >
          シフト
        </button>
        <button
          @click="viewType = 'attendance'"
          class="w-1/2 cursor-pointer font-semibold px-4 py-2"
          :class="
            viewType === 'attendance'
              ? 'bg-blue-500 text-white  rounded'
              : 'bg-white border rounded'
          "
        >
          出勤簿
        </button>
      </div>

      <!-- カレンダー -->
      <div class="grid grid-cols-7 text-base lg:text-xl lg:gap-2">
        <!-- 曜日 -->
        <div
          v-for="(label, i) in ['日', '月', '火', '水', '木', '金', '土']"
          :key="i"
          class="text-center font-semibold bg-green-200 border-r border-b border-t border-gray-500 lg:border-l"
          :class="{
            'text-red-500': i === 0, // 日曜
            'text-blue-500': i === 6, // 土曜
          }"
        >
          {{ label }}
        </div>

        <!-- カレンダー -->
        <div
          v-for="day in calendarDays"
          :key="day"
          class="h-28 cursor-pointer border-r border-b border-gray-500 bg-white p-1 flex flex-col text-xs relative hover:bg-green-100 hover:border-green-500 z-0"
          :class="{ 'bg-yellow-100 border-yellow-500': day === currentDate }"
        >
          <div class="font-bold text-right text-gray-800 whitespace-nowrap">
            {{ day }}
          </div>

          <template v-if="label(day)">
            <div class="text-green-600 whitespace-nowrap">
              始: {{ label(day).start }}
            </div>
            <div class="text-blue-600 whitespace-nowrap">
              終: {{ label(day).end }}
            </div>
            <div class="text-orange-600 whitespace-nowrap">
              休: {{ label(day).breakStart }}~{{ label(day).breakEnd }}
            </div>
          </template>
        </div>  
      </div>

      <!-- 出勤簿 合計 -->
      <div
        v-if="viewType === 'attendance'"
        class="mt-4 p-4 bg-white rounded shadow w-auto border border-green-500"
      >
        <h2 class="text-xl lg:text-2xl font-semibold mb-2">
          {{ monthLabel }}
        </h2>
        <p class="text-gray-800">出勤日数: 20日</p>
        <p class="text-gray-800">労働時間: 160時間</p>
        <p class="text-gray-800">残業時間: 12時間</p>
      </div>
    </main>
  </div>
</template>
