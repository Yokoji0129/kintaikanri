<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  shifts: Array,
  selectedShiftId: Number,
});
const emit = defineEmits(["update:selectedShiftId"]);

const localSelectedShiftId = ref(props.selectedShiftId);
const isOpen = ref(false);

watch(
  () => props.selectedShiftId,
  (val) => (localSelectedShiftId.value = val)
);
watch(localSelectedShiftId, (val) => emit("update:selectedShiftId", val));

const selectShift = (id) => {
  localSelectedShiftId.value = id;
  isOpen.value = false;
};

const getShiftLabel = (id) => {
  const shift = props.shifts.find((s) => s.id === id);
  return shift
    ? `${shift.start} - ${shift.end}（休憩: ${shift.breakStart} - ${shift.breakEnd}）`
    : null;
};

//時間だけ切り抜く
const formatTime = (isoString) => {
  return isoString.split("T")[1].slice(0, 5);
};
</script>

<template>
  <div>
    <label class="block font-semibold md:mb-2">対象シフト選択</label>

    <!-- モーダルを開くトリガーボタン -->
    <button
      @click="isOpen = true"
      class="w-full p-2 border border-gray-300 rounded text-left bg-white hover:ring hover:ring-green-200"
    >
      {{ getShiftLabel(localSelectedShiftId) || "選択してください" }}
    </button>

    <!-- モーダル本体 -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20"
    >
      <div
        class="bg-white rounded-lg shadow-lg max-h-[70vh] w-[90%] md:w-[500px] overflow-y-auto"
      >
        <div class="p-4 border-b text-lg font-semibold">シフトを選択</div>
        <ul>
          <li
            v-for="shift in shifts"
            :key="shift.id"
            class="p-3 hover:bg-green-100 cursor-pointer border-b text-sm"
            @click="selectShift(shift.id)"
          >
            {{ formatTime(shift.beginWork) }}
          </li>
        </ul>

        <button
          class="w-full text-center py-2 text-gray-500"
          @click="isOpen = false"
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
</template>
