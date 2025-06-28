<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  startTime: String,
  endTime: String,
  breakStartTime: String,
  breakEndTime: String,
});

const emit = defineEmits([
  "update:startTime",
  "update:endTime",
  "update:breakStartTime",
  "update:breakEndTime",
]);

const localStart = ref(props.startTime);
const localEnd = ref(props.endTime);
const localStartBreak = ref(props.breakStartTime);
const localEndBreak = ref(props.breakEndTime);

// 親コンポーネントから渡された値が変わったときに子の値を更新（親 → 子）
watch(
  () => props.startTime,
  (val) => (localStart.value = val)
);
watch(
  () => props.endTime,
  (val) => (localEnd.value = val)
);
watch(
  () => props.breakStartTime,
  (val) => (localStartBreak.value = val)
);
watch(
  () => props.breakEndTime,
  (val) => (localEndBreak.value = val)
);

// 子コンポーネント内の値が変わったときに親に変更通知（子 → 親）
watch(localStart, (val) => emit("update:startTime", val));
watch(localEnd, (val) => emit("update:endTime", val));
watch(localStartBreak, (val) => emit("update:breakStartTime", val));
watch(localEndBreak, (val) => emit("update:breakEndTime", val));
</script>

<template>
  <!--始業時刻-->
  <div>
    <label class="block font-semibold md:mb-2">始業時刻</label><!--開始時刻-->
    <input
      type="time"
      v-model="localStart"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
    />
  </div>
  <!--終業時刻-->
  <div>
    <label class="block font-semibold md:mb-2">終業時刻</label><!--終業時刻-->
    <input
      v-model="localEnd"
      type="time"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
    />
  </div>

  <!-- 休憩開始時刻-->
  <div v-if="route.path !== '/attendancerequest'">
    <label class="block font-semibold md:mb-2">休憩開始時刻</label>
    <input
      v-model="localStartBreak"
      type="time"
      value="01:00"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
    />
  </div>

  <!--休憩終了時刻-->
  <div v-if="route.path !== '/attendancerequest'">
    <label class="block font-semibold md:mb-2">休憩終了時刻</label>
    <input
      v-model="localEndBreak"
      type="time"
      value="01:00"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
    />
  </div>
</template>
