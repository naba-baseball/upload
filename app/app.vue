<script setup lang="ts">
const { loggedIn, clear } = useUserSession()
</script>

<template>
  <UApp :toaster="{ position: 'top-center' }">
    <main
      class="h-screen font-sans grid place-content-center bg-gray-50 dark:bg-gray-950"
    >
      <UContainer>
        <div class="mb-2 flex justify-between">
          <ColorTheme />
          <LazyUButton v-if="loggedIn" icon="i-lucide-log-out" variant="ghost" color="gray" @click="clear().then(() => { navigateTo('/login', { replace: true }) })">
            Log out
          </LazyUButton>
        </div>
        <NuxtPage />
      </UContainer>
    </main>
  </UApp>
</template>
