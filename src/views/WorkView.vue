<script setup>
import { ref, computed } from "vue";
import NavList from "../components/NavList.vue";
import Popup from "../components/Popup.vue";

// 表示切替（"shift" or "attendance"）
const viewType = ref("shift");

const showPopup = ref(false)

const togglePopup = () => {
  showPopup.value = !showPopup.value
  console.log(showPopup.value)
}

// 今日の情報
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();

// 表示中の年月（初期は今日）
const year = ref(currentYear);
const month = ref(currentMonth);

// 現在の月かどうか（1日背景色のため）
const isCurrentMonth = computed(() => {
  return year.value === currentYear && month.value === currentMonth;
});

//前の月
const prevMonth = () => {
  if (month.value === 0) {
    year.value--;
    month.value = 11;
  } else {
    month.value--;
  }
};

//次の月
const nextMonth = () => {
  if (month.value === 11) {
    year.value++;
    month.value = 0;
  } else {
    month.value++;
  }
};

// 表示用の "YYYY-MM" キー生成
const monthKey = computed(() => {
  return `${year.value}-${String(month.value + 1).padStart(2, '0')}`;
});
  
// その月の1日の日付オブジェクトを作成（year.value年 month.value月の1日）
const firstDate = computed(() => new Date(year.value, month.value, 1));

// その月の末日（日数）を取得（次の月の0日が今月の末日になる）
const daysInMonth = computed(() =>
  new Date(year.value, month.value + 1, 0).getDate()
);

// その月の1日の曜日を取得（日曜=0～土曜=6）
const firstDayOfWeek = computed(() => firstDate.value.getDay());

// カレンダーの空白セルを開始曜日の数だけ作成（1日が正しい曜日の位置に来るように）
const emptyCells = computed(() =>
  Array.from({ length: firstDayOfWeek.value })
);

// カレンダーの日付セル（1～月末日まで）の配列を作成
// (_, i)は使わない値とインデックス。インデックスに1を足して日付を作る
const calendarDays = computed(() =>
  Array.from({ length: daysInMonth.value }, (_, i) => i + 1)
);

// カレンダーの上部に表示する年月ラベル（例：2025年6月）
const monthLabel = computed(() => `${year.value}年${month.value + 1}月`);


//月ごとのシフトデータ
const shiftData = {
  '2025-06': {
    5: { start: "09:00", end: "18:00", breakStart: "12:00", breakEnd: "13:00" },
    20: { start: "10:00", end: "18:00", breakStart: "12:00", breakEnd: "13:00" },
  },
  '2025-07': {
    3: { start: "09:30", end: "17:30", breakStart: "12:00", breakEnd: "13:00" },
    10: { start: "10:00", end: "18:00", breakStart: "13:00", breakEnd: "14:00" },
  },
};

//月ごとの出勤簿
const attendanceData = {
  '2025-06': {
    5: { start: "09:02", end: "18:10", breakStart: "12:05", breakEnd: "13:00" },
    20: { start: "10:01", end: "17:45", breakStart: "12:00", breakEnd: "13:00" },
  },
  '2025-07': {
    3: { start: "09:33", end: "17:32", breakStart: "12:00", breakEnd: "13:00" },
    10: { start: "10:05", end: "18:05", breakStart: "13:00", breakEnd: "14:00" },
  },
};

// 表示ラベル取得
const label = (day) => {
  const data =
    viewType.value === "shift" ? shiftData[monthKey.value] : attendanceData[monthKey.value];
  return data?.[day] ?? null;
};
</script>

<template>
  <div class="flex h-screen">
    <NavList />

    <main class="flex-1 p-0 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:p-6">
      <!-- 月ヘッダー -->
      <div class="flex justify-between items-center mb-4 px-4">
        <button
          @click="prevMonth"
          class="text-xl font-bold bg-white border px-4 py-1 rounded hover:bg-gray-200"
        >
          ←
        </button>
        <h1 class="text-xl lg:text-2xl font-bold text-center">
          📅{{ monthLabel }}
        </h1>
        <button
          @click="nextMonth"
          class="text-xl font-bold bg-white border px-4 py-1 rounded hover:bg-gray-200"
        >
          →
        </button>
      </div>

      <!-- タブ切替 -->
      <div class="m-4 flex space-x-4 text-base lg:text-xl">
        <button
          @click="viewType = 'shift'"
          class="w-1/2 cursor-pointer font-semibold px-4 py-2"
          :class="viewType === 'shift'
            ? 'bg-green-500 text-white rounded'
            : 'bg-white border rounded'"
        >
          シフト
        </button>
        <button
          @click="viewType = 'attendance'"
          class="w-1/2 cursor-pointer font-semibold px-4 py-2"
          :class="viewType === 'attendance'
            ? 'bg-blue-500 text-white rounded'
            : 'bg-white border rounded'"
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
          class="text-center font-semibold bg-green-200 border-t border-b border-r border-gray-500 lg:border-l"
          :class="{
            'text-red-500': i === 0,
            'text-blue-500': i === 6,
          }"
        >
          {{ label }}
        </div>

        <!-- 空白セル -->
        <div
          v-for="(_, i) in emptyCells"
          :key="'empty-' + i"
          class="h-28 bg-gray-200 border-r border-b lg:border-t lg:border-l"
        ></div>

        <!-- 日付セル -->
        <div
          v-for="day in calendarDays"
          :key="day"
          @click="togglePopup"
          class="h-28 cursor-pointer border-r border-b border-gray-500 bg-white p-1 flex flex-col text-xs relative hover:bg-green-100 hover:border-green-500 lg:border-t lg:border-l"
          :class="{
            'bg-yellow-100 border-yellow-500': isCurrentMonth && day === currentDate,
          }"
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


      <!-- 出勤簿 合計（固定表示） -->
      <div
        v-if="viewType === 'attendance'"
        class="mt-4 p-4 bg-white rounded shadow border border-green-500"
      >
        <h2 class="text-xl lg:text-2xl font-semibold mb-2">{{ monthLabel }}</h2>
        <p class="text-gray-800">出勤日数: 20日</p>
        <p class="text-gray-800">労働時間: 160時間</p>
        <p class="text-gray-800">残業時間: 12時間</p>
      </div>

      <Popup v-if="showPopup" />
    </main>
  </div>
</template>
