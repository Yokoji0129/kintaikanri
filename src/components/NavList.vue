<template>
  <div class="flex h-screen text-base">
    <!--左側のナビ-->
    <nav
      class="w-64 bg-green-500 text-white flex flex-col justify-between py-4"
    >
      <!--上部メニュー-->
      <div>
        <ul class="space-y-2 px-2">
          <li>
            <router-link
              to="/application"
              class="block hover:bg-green-600 rounded px-3 py-2"
            >
              各種申請
            </router-link>
          </li>
          <li>
            <router-link
              to="/work"
              class="block hover:bg-green-600 rounded px-3 py-2"
            >
              出勤簿
            </router-link>
          </li>
          <li>
            <router-link
              to="/history"
              class="block hover:bg-green-600 rounded px-3 py-2"
            >
              申請履歴
            </router-link>
          </li>
        </ul>
      </div>

      <!--下部メニュー-->
      <div class="space-y-2 px-2">
        <router-link
          to="/support"
          class="block bg-blue-500 hover:bg-blue-600 rounded px-3 py-2"
        >
          サポート
        </router-link>
        <div class="block bg-gray-500 rounded px-3 py-2">
          アカウント名: よこじ
        </div>
      </div>
    </nav>
  </div>
</template>
