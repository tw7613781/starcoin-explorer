import * as types from './constants';

export function getTransaction(payload: any) {
  return {
    type: types.GET_TRANSACTION,
    payload
  };
}

export function setTransaction(payload: any) {
  return {
    type: types.SET_TRANSACTION,
    payload
  };
}

export function getTransactionList(payload: any, callback?: any) {
  return {
    type: types.GET_TRANSACTION_LIST,
    payload,
    callback
  };
}

export function setTransactionList(payload: any) {
  return {
    type: types.SET_TRANSACTION_LIST,
    payload
  };
}