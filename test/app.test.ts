import { describe, it, expect } from "vitest";
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TransactionForm from '../src/components/TransactionForm.vue'
import { Field, Form as ValidatorForm, ErrorMessage } from 'vee-validate'
import { useTransactionStore } from '../src/store/transaction'
import Spinner from '../src/components/global/Spinner.vue'
import axios from 'axios'


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function factory (options = {}) {

    const wrapper = mount(TransactionForm, {
        global: {
            plugins: [createTestingPinia(options)],
        },
        components: {
            Spinner,
            Field,
            ValidatorForm,
            ErrorMessage
        }
    })

    const transactions = useTransactionStore()

    return { wrapper, transactions }
}

describe('test application', () => {

    it('Test TransactionForm Elements', async () => {

        const { wrapper } = factory()

        expect(wrapper.find('form').exists()).toBeTruthy()
        expect(wrapper.find('input[name="account_id"]').exists()).toBeTruthy()
        expect(wrapper.find('input[name="amount"]').exists()).toBeTruthy()
        expect(wrapper.find('button[type="submit"]').exists()).toBeTruthy()
    })

    it('Test TransactionForm Submit Form', async () => {

        const { wrapper, transactions } = factory({ stubActions: false })

        await wrapper.find('input[name="account_id"]').setValue(uuid())
        await wrapper.find('input[name="amount"]').setValue(10)
        await wrapper.find('button[type="submit"]').trigger('click')

        console.log(wrapper.vm.transactions)

        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post).toHaveBeenCalledWith('https://infra.devskills.app/api/accounting/transactions')

        await flushPromises()

    })
})