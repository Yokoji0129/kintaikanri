<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const localReason = ref(props.modelValue);

// 親から渡される値が変わったら、それに合わせてlocalReasonも更新
watch(() => props.modelValue, (value) => {
  localReason.value = value;
});

// テキストエリアで入力があるたびに発火して、親に値を伝える
const onInput = (e) => {
  emit("update:modelValue", e.target.value); // 親コンポーネントに更新を通知
};
</script>

<!--申請理由コンポーネント-->
<template>
  <div>
    <label class="block font-semibold md:mb-2">申請理由(任意)</label>
    <!--@inputはユーザーが入力したときに発火する-->
    <textarea
      class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
      rows="3"
      placeholder="申請理由を入力してください"
      @input="onInput"
    ></textarea>
  </div>
</template>
