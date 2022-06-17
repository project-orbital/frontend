import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './transactions'
import accountsReducer from './accounts'

export default configureStore({
    reducer: {
        transactions: transactionsReducer,
        accounts: accountsReducer
    },
})
