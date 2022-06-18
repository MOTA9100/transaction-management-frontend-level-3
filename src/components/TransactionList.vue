<template>
  <div class="bg-white rounded-lg p-6 shadow-lg">
    <div v-if="loading" class="w-full h-full flex justify-center items-center">
      <spinner />
    </div>
    <div v-else-if="!transactions.length" class="w-full h-full flex justify-center items-center">
      <p>No Transaction Recorded</p>
    </div>
    <div v-else>
      <div v-for="(transaction, i) in transactions" :key="transaction.transaction_id">
        <transaction-item :item="transaction" :balance="i === 0 ? accountBalance : null" />
        <p v-if="i === 0" class="px-3.5 py-2">
          the current account Balance: ${{ accountBalance }}
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/store/transaction'
import TransactionItem from "@/components/TransactionItem.vue";

export default {
  setup () {
    const transactionStore = useTransactionStore()
    const { transactions, loading, accountBalance } = storeToRefs(transactionStore)
    const { fetchTransactions } = transactionStore
    return {
      transactions,
      loading,
      accountBalance,
      fetchTransactions
    }
  },
  name: 'TransactionList',
  components: {
    TransactionItem
  },
  created () {
    console.log('here')
    this.fetchTransactions()
  },
  methods: {
    // setBalance (accountId) {
    //   this.balance.loading = true
    //   this.axios.get(`https://infra.devskills.app/api/accounting/accounts/${accountId}`).then(({ data }) => {
    //     this.balance.value = data.balance
    //   }).catch(this.$root.errorHandler).finally(() => {
    //     this.balance.loading = false
    //   })
    // }
  }
}
</script>
