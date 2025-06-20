<script setup>
import { ref } from "vue";
import ApplyBtn from "../../components/ApplyBtn.vue";
import NavList from "../../components/NavList.vue";
import RequestReason from "../../components/RequestReason.vue";

const vacations = ref([
  "有給",
  "代休",
  "欠勤",
  "忌引き",
  "特別休暇",
  "子供",
  "介護",
  "保存",
]);

const selectedVacation = ref(null); //選択された休暇種別
const reasonText = ref(""); //申請理由テキスト

//休暇申請関数
const vacationPost = () => {
  console.log(
    `休暇申請から押した。休暇種類: ${selectedVacation.value} 申請理由: ${reasonText.value}`
  );
};
</script>

<!--休暇申請ページ-->
<template>
  <div class="flex h-screen">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">
      <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">休暇申請</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">
        <!--休暇種類選択-->
        <div>
          <label class="block font-semibold md:mb-2">休暇種類</label>
          <select
            v-model="selectedVacation"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200 hover:ring hover:ring-green-200"
          >
            <option disabled :value="null">選択してください</option>
            <option v-for="vacation in vacations" :key="vacation.id">
              {{ vacation }}
            </option>
          </select>
        </div>

        <!--時間帯選択-->

        <!--申請時間-->
        <RequestReason v-model:reasonText="reasonText" />

        <!--申請ボタン-->
        <ApplyBtn :vacationPost="vacationPost" />
      </div>
    </main>
  </div>
</template>
