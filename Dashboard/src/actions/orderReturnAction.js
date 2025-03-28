export const addToOrderReturn = product => {
  return {
    type: 'ADD_PRODUCT_RETURN',
    payload: product,
  };
};

export const removeProductReturn = code => ({
  type: 'REMOVE_PRODUCT_RETURN',
  payload: code,
});

export const reduceProductReturn = product => {
  return {
    type: 'REDUCE_PRODUCT_QUANTITY_RETURN',
    payload: product,
  };
};

export const increaseProductReturn = code => {
  return {
    type: 'INCREASE_PRODUCT_QUANTITY_RETURN',
    payload: code,
  };
};

export const importOrderReturn = order => {
  return {
    type: 'IMPORT_ORDER_RETURN',
    payload: order,
  };
};

export const clearOrderReturn = () => {
  return {
    type: 'CLEAR_ORDER_RETURN',
    payload: [],
  };
};
