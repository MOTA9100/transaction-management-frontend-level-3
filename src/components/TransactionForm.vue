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
        <span v-if="processing">Processing...</span>
        <span v-else>Submit</span>
      </button>
    </validator-form>
  </div>
</template>

<script>
import { Field, Form as ValidatorForm, ErrorMessage } from 'vee-validate'
import * as Yup from 'yup'
import feather from "feather-icons";

export default {
  name: 'Form',
  components: {
    Field,
    ValidatorForm,
    ErrorMessage,
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
  mounted () {
    this.$nextTick(() => {
      feather.replace()
    })
  },
  methods: {
    create () {
      this.processing = true
      this.axios.post('https://infra.devskills.app/api/accounting/transactions', this.form).then(({ data }) => {
        this.clearForm()
        this.emitter.emit('add-transaction-item', data)
        this.$notify({ position: 'top left', text: 'Transaction Created', type: 'success'})
      }).catch(this.$root.errorHandler).finally(() => {
        this.processing = false
      });
    },
    clearForm () {
      this.form.amount = null
      this.form.account_id = null
      this.$refs.validatorForm.resetForm()
    }
  }
}
</script>