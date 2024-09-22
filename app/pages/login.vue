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
  useUserSession().fetch().then(() => { navigateTo('/', { replace: true }) })
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
      <UFormGroup label="Username">
        <UInput id="username" v-model="username" name="username" type="text" />
      </UFormGroup>
      <UFormGroup label="Password">
        <UInput id="password" v-model="password" name="password" type="password" />
      </UFormGroup>
      <UFormGroup :error="submit.error.value?.data?.message ">
        <UButton type="submit">
          Login
        </UButton>
      </UFormGroup>
    </form>
  </UCard>
</template>

<style>

</style>
