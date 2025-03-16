export const addToOrder = product => {
  return {
    type: 'ADD_PRODUCT',
    payload: product,
  };
};

export const removeProduct = code => ({
  type: 'REMOVE_PRODUCT',
  payload: code,
});

export const reduceProduct = product => {
  return {
    type: 'REDUCE_PRODUCT_QUANTITY',
    payload: product,
  };
};

export const increaseProduct = code => {
  return {
    type: 'INCREASE_PRODUCT_QUANTITY',
    payload: code,
  };
};

export const importOrder = order => {
  return {
    type: 'IMPORT_ORDER',
    payload: order,
  };
};

export const clearOrder = () => {
  return {
    type: 'CLEAR_ORDER',
    payload: [],
  };
};
