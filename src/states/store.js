import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './transactions'

export default configureStore({
    reducer: {
        transactions: transactionsReducer,
    },
})
