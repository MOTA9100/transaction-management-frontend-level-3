<template>
  <div class="bg-white rounded-lg p-6 shadow-lg">
    <div v-if="loading" class="w-full h-full flex justify-center items-center">
      <i data-feather="loader" class="spinner"></i>
    </div>
    <div v-else-if="!items.length" class="w-full h-full flex justify-center items-center">
      <p>No Transaction Recorded</p>
    </div>
    <div v-else>
      <div v-for="(item, i) in items" :key="item.transaction_id">
        <transaction-item :item="item" :balance="i === 0 ? balance : null" />
        <p v-if="i === 0 && balance !== null" class="px-3.5 py-2">the current account Balance ${{ balance }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionItem from "@/components/TransactionItem.vue";
import feather from "feather-icons";

export default {
  name: 'TransactionList',
  components: {
    TransactionItem
  },
  data: () => ({
    loading: true,
    items: [],
    balance: null
  }),
  created () {
    this.fetchItems()
  },
  mounted () {
    this.emitter.on('add-transaction-item', this.addItem)
    this.$nextTick(() => {
      feather.replace()
    })
  },
  watch: {
    items: {
      deep: true,
      handler(value) {
        this.setBalance(value[0].account_id)
      }
    }
  },
  methods: {
    fetchItems() {
      this.loading = true
      this.axios.get('https://infra.devskills.app/api/accounting/transactions').then(({ data }) => {
        if (Array.isArray(data)) {
          this.items = data
        }
      }).catch(this.$root.errorHandler).finally(() => {
        this.loading = false
      })
    },
    addItem (item) {
      this.items.unshift(item)
    },
    setBalance (accountId) {
      this.axios.get(`https://infra.devskills.app/api/accounting/accounts/${accountId}`).then(({ data }) => {
        this.balance = data.balance
      }).catch(this.$root.errorHandler)
    }
  }
}
</script>
