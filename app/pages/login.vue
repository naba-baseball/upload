<script lang="ts" setup>
const username = ref('')
const password = ref('')
const submit = await useFetch('/api/user-session', {
  method: 'POST',
  immediate: false,
  watch: false,
  body: {
    username,
    password,
  },
})
watch(() => submit.status.value === 'success', () => {
  useUserSession().fetch().then(() => void navigateTo('/', { replace: true }))
})
</script>

<template>
  <UCard as="section">
    <template #header>
      <span class="text-lg font-bold">
        Login
      </span>
    </template>
    <form class="space-y-4" @submit.prevent="submit.execute()">
      <UFormField label="Username">
        <UInput id="username" v-model="username" class="w-full" name="username" type="text" />
      </UFormField>
      <UFormField label="Password">
        <UInput id="password" v-model="password" class="w-full" name="password" type="password" />
      </UFormField>
      <UFormField :error="submit.error.value?.data?.message ">
        <UButton type="submit">
          Login
        </UButton>
      </UFormField>
    </form>
  </UCard>
</template>

<style>

</style>
