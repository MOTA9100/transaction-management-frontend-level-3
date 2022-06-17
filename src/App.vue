<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/images/logo.webp" width="125" height="125" />
    Valour
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
export default {
  name: "App"
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

</style>