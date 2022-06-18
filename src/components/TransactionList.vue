<template>
  <div class="bg-white rounded-lg p-6 shadow-lg">
    <div v-if="loading" class="w-full h-full flex justify-center items-center">
      <spinner />
    </div>
    <div v-else-if="!items.length" class="w-full h-full flex justify-center items-center">
      <p>No Transaction Recorded</p>
    </div>
    <div v-else>
      <div v-for="(item, i) in items" :key="item.transaction_id">
        <transaction-item :item="item" :balance="i === 0 ? currentBalance : null" />
        <p v-if="i === 0 && currentBalance" class="px-3.5 py-2">
          the current account Balance: ${{ currentBalance }}
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import TransactionItem from "@/components/TransactionItem.vue";

export default {
  name: 'TransactionList',
  components: {
    TransactionItem
  },
  data: () => ({
    loading: true,
    items: [],
    balances: {},
    currentAccount: null
  }),
  computed: {
    currentBalance () {
      return this.currentAccount && this.balances[this.currentAccount] ? this.balances[this.currentAccount] : null
    }
  },
  created () {
    this.fetchItems()
  },
  mounted () {
    this.emitter.on('add-transaction-item', this.addItem)
  },
  watch: {
    items: {
      deep: true,
      handler (value) {
        this.addBalance(value[0].account_id, value[0].amount)
        this.currentAccount = value[0].account_id
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
    addBalance (accountId, amount) {
      this.balances[accountId] = parseInt((this.balances[accountId] || 0)) + parseInt(amount)
    }
  }
}
</script>
