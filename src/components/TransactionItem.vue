<template>
  <div
      class="p-3.5 flex justify-between items-center"
      data-type="transaction"
      :data-account-id="item.account_id"
      :data-amount="item.amount"
      :data-balance="balance"
  >
    <p>transferred <span :class="{ 'text-rose-600': isWithdraw, 'text-green-500': !isWithdraw }">${{ Math.abs(item.amount) }}</span> {{ transactionTypeText }} account <span class="p-2 bg-stone-100">{{ item.account_id }}</span></p>
    <span :class="['text-xs', 'text-white', 'p-2.5', 'rounded-xl', { 'bg-rose-600': isWithdraw, 'bg-green-500': !isWithdraw }]">
      {{ transactionType }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TransactionItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    balance: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    transactionTypeText () {
      return this.item.amount > 0 ? 'to' : 'from'
    },
    transactionType () {
      return this.item.amount > 0 ? 'Deposit' : 'Withdraw'
    },
    isWithdraw () {
      return this.item.amount > 0 ? false : true
    }
  }
}
</script>