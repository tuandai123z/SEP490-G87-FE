const saleReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_SALE': {
      const products = [...state];
      const data = action.payload;
      const index = products.findIndex(product => {
        return product.code === data.code;
      });

      if (index !== -1) {
        products[index].quantity += 1;
      } else {
        products.push({ ...action.payload, quantity: 1, discount: 0 });
      }

      return products;
    }

    case 'INCREASE_PRODUCT_QUANTITY_SALE': {
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

    case 'REDUCE_PRODUCT_QUANTITY_SALE': {
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

    case 'REMOVE_PRODUCT_SALE': {
      const data = action.payload;
      let newState = [];

      if (data?.code) {
        newState = state.filter(s => s?.code !== data?.code);
      } else {
        newState = state;
      }

      return newState;
    }

    case 'CHANGE_QUANTITY_PRODUCT_SALE': {
      const { code, quantity } = action.payload;
      const products = state.map(product => (product.code === code ? { ...product, quantity } : product));

      return products;
    }

    case 'IMPORT_ORDER_SALE': {
      const data = action.payload;
      return [...data];
    }

    case 'CLEAR_ORDER_SALE': {
      return action.payload;
    }

    case 'UPDATE_DISCOUNT': {
      const data = state?.map(item => (item.code === action.payload.code ? { ...item, discount: action.payload.discount } : item));
      return [...data];
    }
    default:
      return state;
  }
};

export default saleReducer;
