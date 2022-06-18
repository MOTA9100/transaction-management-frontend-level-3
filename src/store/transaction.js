import axios from 'axios'
import { defineStore } from 'pinia'
import Helpers from '@/mixins/helpers'

export const useTransactionStore = defineStore('transactions', {
    state: () => {
        return {
            transactions: [],
            currentAccount: null,
            loading: false
        }
    },
    getters: {
        accountBalance: (state) => {
            const accountTransactions = state.transactions.filter(transaction => transaction.account_id === state.currentAccount)
            return accountTransactions.reduce((sum, object) => {
                let amount = parseInt(object.amount)
                amount = isNaN(amount) ? 0 : amount
                return sum + amount;
            }, 0);
        }
    },
    actions: {
        async fetchTransactions () {
            console.log('and here')
            this.$patch({ loading: true })
            await axios.get('https://infra.devskills.app/api/accounting/transactions').then(({ data }) => {
                if (data.length) {
                    console.log(data)
                    this.$patch({
                        transactions: [
                            ...data,
                            ...this.transactions
                        ],
                        currentAccount: data[0].account_id
                    })
                }
            }).catch(Helpers.errorHandler).finally(() => {
                this.$patch({ loading: false })
            })
        },
        addTransaction (transaction) {
            this.$patch({
                transactions: [
                    transaction,
                    ...this.transactions
                ]
            })
        },
        setCurrentAccount (accountId) {
            this.$patch({
                currentAccount: accountId
            })
        }
    }
})