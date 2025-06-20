<script setup>
const props = defineProps({
  startTime: String,
  endTime: String,
  breakStartTime: String,
  breakEndTime: String
});
</script>
<!--申請時間-->
<template>
  <div>
    <label class="block font-semibold md:mb-2">申請時間</label>
    <input
      type="text"
      class="w-full p-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
      :value="`出勤：${startTime}-${endTime}　休憩：${breakStartTime}-${breakEndTime}`"
      readonly
    />
  </div>
</template>