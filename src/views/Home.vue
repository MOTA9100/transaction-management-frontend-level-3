<template>
  <div class="grid grid-cols-12 auto-cols-auto gap-2">
    <transaction-form class="col-span-4 h-content" />
    <transaction-list class="col-span-8" />
  </div>
</template>

<script>
import TransactionForm from '@/components/TransactionForm.vue'
import TransactionList from '@/components/TransactionList.vue'
export default {
  name: "Home",
  components: {
    TransactionForm,
    TransactionList
  }
}
</script>
