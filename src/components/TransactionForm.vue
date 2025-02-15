<template>
  <div class="bg-white rounded-lg p-6 shadow-lg">
    <validator-form v-slot="{ errors }" ref="validatorForm" :validation-schema="schema" @submit="create">
      <div class="mb-4">
        <field
            v-model="form.account_id"
            class="block w-full p-1.5 rounded-lg border border-black"
            type="text"
            name="account_id"
            placeholder="Account ID"
            data-type="account-id"
        />
        <error-message class="block text-rose-600" name="account_id" />
      </div>
      <div class="mb-4">
        <field
            v-model="form.amount"
            class="block w-full p-1.5 rounded-lg border border-black"
            type="text"
            name="amount"
            placeholder="Amount"
            data-type="amount"
        />
        <error-message class="block text-rose-600" name="amount" />
      </div>
      <button
          type="submit"
          class="w-full p-1.5 flex justify-center items-center rounded-lg bg-green-500 text-white disabled:opacity-25"
          data-type="transaction-submit"
      >
        <spinner v-if="processing" :width="18" :height="18" />
        <span v-else>Submit</span>
      </button>
    </validator-form>
  </div>
</template>

<script>
import { useTransactionStore } from '@/store/transaction'
import { Field, Form as ValidatorForm, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'

export default {
  setup () {
    const transactionStore = useTransactionStore()
    const { addTransaction, setCurrentAccount } = transactionStore
    return {
      transactionStore,
      addTransaction,
      setCurrentAccount
    }
  },
  name: 'Form',
  components: {
    Field,
    ValidatorForm,
    ErrorMessage
  },
  data: () => ({
    processing: false,
    schema: {},
    form: {
      account_id: null,
      amount: null
    }
  }),
  created() {
    this.schema = Yup.object({
      account_id: Yup.string().required().uuid('Account ID must be a valid UUID').typeError('Account ID is required and must be uuid v4.'),
      amount: Yup.number().required().typeError('Amount is required and must be a valid number.')
    })
  },
  methods: {
    create () {
      this.processing = true
      this.transactionStore.$patch({ loading: true })
      this.axios.post('https://infra.devskills.app/api/accounting/transactions', this.form).then(({ data }) => {
        this.setCurrentAccount(this.form.account_id)
        this.clearForm()
        this.addTransaction(data)
        this.$notify({ position: 'top left', text: 'Transaction Created', type: 'success'})
      }).catch(this.$root.errorHandler).finally(() => {
        this.processing = false
        this.transactionStore.$patch({ loading: false })
      })
    },
    clearForm () {
      this.form.amount = null
      this.form.account_id = null
      this.$refs.validatorForm.resetForm()
    }
  }
}
</script>