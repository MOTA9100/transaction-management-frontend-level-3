<template>
  <header class="flex justify-between items-center py-2">
    <div class="flex justify-start items-center">
      <img src="@/assets/images/logo.webp" alt="Valour" width="50" height="50" />
      <h1 class="ml-2">Valour</h1>
    </div>
    <nav>
      <RouterLink
          v-for="link in links"
          class="px-4 py-2 underline decoration-2 hover:decoration-1 hover:text-green-600 hover:decoration-green-600"
          :to="link.path"
          v-text="link.name"
      />
    </nav>
  </header>
  <main>
    <RouterView />
    <notifications />
  </main>
</template>

<script>
import Helpers from '@/mixins/helpers'

export default {
  name: 'App',
  data: () => ({
    links: []
  }),
  created () {
    this.$router.options.routes.forEach(route => {
      this.links.push({
        name: route.name,
        path: route.path
      })
    })
  },
  methods: {
    ...Helpers
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

</style>