<script setup>
import ApplyBtn from "../../components/ApplyBtn.vue";
import NavList from "../../components/NavList.vue";
</script>

<!--遅刻・早退・外出申請ページ-->
<template>
  <div class="flex h-screen">
    <NavList />
    <main class="flex-1 p-6 bg-gray-100 overflow-auto pt-25 lg:ml-64 lg:pt-7">

       <h1 class="text-xl font-bold mb-3 md:mb-6 text-center">遅刻・早退・外出申請ページ</h1>

      <div class="bg-white p-4 md:p-6 rounded-lg shadow-md space-y-5">

       <ApplyBtn />
      </div>
    </main>
  </div>
</template>
