<script setup lang="ts">
const { loggedIn, clear } = useUserSession()
</script>

<template>
  <main
    class="h-screen font-sans grid place-content-center bg-gray-50 dark:bg-gray-950"
  >
    <UContainer>
      <UNotifications />
      <div class="mb-2 flex justify-between">
        <ColorTheme />
        <LazyUButton v-if="loggedIn" icon="i-lucide-log-out" variant="ghost" color="gray" @click="clear().then(() => { navigateTo('/login', { replace: true }) })">
          Log out
        </LazyUButton>
      </div>
      <NuxtPage />
    </UContainer>
  </main>
</template>

<style>
.transition-name-card {
  view-transition-name: card;
}
</style>
