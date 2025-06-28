<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  startTime: String,
  endTime: String,
  breakStartTime: String,
  breakEndTime: String
});

const isOvertime = route.path === '/overtime'
const isAttendanceRequest = route.path === '/attendancerequest'
</script>
<!--申請時間-->
<template>
  <div>
    <label class="block font-semibold md:mb-2">申請時間</label>
    <input
      type="text"
      class="w-full p-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
      :value="`${!isOvertime ? '出勤' : '残業'}：${startTime}-${endTime}${!isOvertime &&!isAttendanceRequest ? `　休憩：${breakStartTime}-${breakEndTime}` : ''}`"
      readonly
    />
  </div>
</template>