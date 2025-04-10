export const addToOrderSale = product => {
  return {
    type: 'ADD_PRODUCT_SALE',
    payload: product,
  };
};

export const removeProductSale = code => ({
  type: 'REMOVE_PRODUCT_SALE',
  payload: code,
});

export const reduceProductSale = product => {
  return {
    type: 'REDUCE_PRODUCT_QUANTITY_SALE',
    payload: product,
  };
};

export const increaseProductSale = code => {
  return {
    type: 'INCREASE_PRODUCT_QUANTITY_SALE',
    payload: code,
  };
};

export const changeQuantityProductSale = payload => ({
  type: 'CHANGE_QUANTITY_PRODUCT_SALE',
  payload: payload,
});

export const importOrderSale = order => {
  return {
    type: 'IMPORT_ORDER_SALE',
    payload: order,
  };
};

export const clearOrderSale = () => {
  return {
    type: 'CLEAR_ORDER_SALE',
    payload: [],
  };
};

export const updateDiscount = payload => {
  return {
    type: 'UPDATE_DISCOUNT',
    payload: payload,
  };
};
