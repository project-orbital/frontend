import { parseISO } from "date-fns";
import currency from "currency.js";

export const transformAsset = (asset) => ({
    id: asset._id,
    createdAt: parseISO(asset.createdAt),
    name: asset.name,
    symbol: asset.symbol,
    category: asset.category,
    price: currency(asset.price["$numberDecimal"]),
    yield: currency(asset.yield["$numberDecimal"]),
});
export const transformAssets = (response) => response.map(transformAsset);

export const transformLiability = (liability) => ({
    id: liability._id,
    createdAt: parseISO(liability.createdAt),
    name: liability.name,
    description: liability.description,
    category: liability.category,
    amount: currency(liability.amount["$numberDecimal"]),
    interest: currency(liability.interest["$numberDecimal"]),
});
export const transformLiabilities = (response) =>
    response.map(transformLiability);

export const transformOrder = (order) => ({
    id: order._id,
    assetId: order.asset_id,
    createdAt: parseISO(order.createdAt),
    date: parseISO(order.date),
    amount: currency(order.amount["$numberDecimal"]),
    price: currency(order.price["$numberDecimal"]),
    fee: currency(order.fee["$numberDecimal"]),
});
export const transformOrders = (response) => response.map(transformOrder);

export const transformPayment = (payment) => ({
    id: payment._id,
    liabilityId: payment.liability_id,
    createdAt: parseISO(payment.createdAt),
    date: parseISO(payment.date),
    amount: currency(payment.amount["$numberDecimal"]),
});
export const transformPayments = (response) => response.map(transformPayment);
