const orderReturnReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_RETURN': {
      const products = [...state];
      const data = action.payload;
      const index = products.findIndex(product => {
        return product.code === data.code;
      });

      if (index !== -1) {
        products[index].quantity += 1;
      } else {
        products.push({ ...action.payload, quantity: 1 });
      }

      return products;
    }

    case 'INCREASE_PRODUCT_QUANTITY_RETURN': {
      const products = [...state];
      const data = action.payload;
      const index = products.findIndex(product => {
        return product.code === data.code;
      });
      if (index !== -1) {
        products[index].quantity += 1;
      }

      return products;
    }

    case 'REDUCE_PRODUCT_QUANTITY_RETURN': {
      const products = [...state];
      const data = action.payload;
      const index = products.findIndex(product => {
        return product.code === data.code;
      });

      if (index !== -1 && products[index].quantity > 1) {
        products[index].quantity -= 1;
      }

      return products;
    }

    case 'REMOVE_PRODUCT_RETURN': {
      const data = action.payload;
      let newState = [];

      if (data?.code) {
        newState = state.filter(s => s?.code !== data?.code);
      } else {
        newState = state;
      }

      return newState;
    }

    case 'IMPORT_ORDER_RETURN': {
      const data = action.payload;
      return [...data];
    }

    case 'CLEAR_ORDER_RETURN': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default orderReturnReducer;
