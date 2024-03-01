<template>
  <main>
    <form method="POST" action="/api/upload" enctype="multipart/form-data">
      <label>
        Upload
        <input name="file" required type="file" />
      </label>
      <button type="submit">Upload file</button>
    </form>
  </main>
</template>
