const orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
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

    case 'INCREASE_PRODUCT_QUANTITY': {
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

    case 'REDUCE_PRODUCT_QUANTITY': {
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

    case 'REMOVE_PRODUCT': {
      const data = action.payload;
      let newState = [];

      if (data?.code) {
        newState = state.filter(s => s?.code !== data?.code);
      } else {
        newState = state;
      }

      return newState;
    }

    case 'CLEAR_ORDER': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default orderReducer;
