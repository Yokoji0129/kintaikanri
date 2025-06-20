<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    shifts: Array,
    selectedShiftId: Number
});

const emit = defineEmits([
  "update:selectedShiftId",
]);

const localSelectedShiftId = ref(props.selectedShiftId);

// 親コンポーネントから渡された値が変わったときに子の値を更新（親 → 子）
watch(() => props.selectedShiftId, val => localSelectedShiftId.value = val);

// 子コンポーネント内の値が変わったときに親に変更通知（子 → 親）
watch(localSelectedShiftId, val => emit("update:selectedShiftId", val));
</script>

<template>
  <div>
    <label class="block font-semibold md:mb-2">対象シフト選択</label>
    <select
      v-model="localSelectedShiftId"
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
    >
      <option disabled :value="null">選択してください</option>
      <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
        {{ shift.start }} - {{ shift.end }} (休憩) {{ shift.breakStart }} -
        {{ shift.breakEnd }}
      </option>
    </select>
  </div>
</template>