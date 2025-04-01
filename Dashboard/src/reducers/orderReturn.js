const orderReturnReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_RETURN': {
      const products = [...state];
      const data = action.payload;
      const index = products.findIndex(product => {
        return product.code === data.code && product.statusReturn === data.statusReturn;
      });

      if (index !== -1) {
        products[index].currentQuantity += 1;
      } else {
        products.push({ ...action.payload, currentQuantity: 1 });
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
        products[index].currentQuantity += 1;
      }

      return products;
    }

    case 'REDUCE_PRODUCT_QUANTITY_RETURN': {
      const products = [...state];
      const data = action.payload;
      const index = products.findIndex(product => {
        return product.code === data.code;
      });

      if (index !== -1 && products[index].currentQuantity > 1) {
        products[index].currentQuantity -= 1;
      }

      return products;
    }

    case 'REMOVE_PRODUCT_RETURN': {
      const data = action.payload;
      let newState = [];

      if (data?.code) {
        newState = state.filter(s => !(s?.code === data?.code && s?.statusReturn === data?.statusReturn));
      } else {
        newState = state;
      }

      return newState;
    }

    case 'CHANGE_STATUS_RETURN': {
      if (state?.length === 1) {
        return state.map(item => (item.code === action.payload.code ? { ...item, statusReturn: action.payload.newStatus } : item));
      }
       const returnChange = state.find(item => item.code === action.payload.code && item.statusReturn === !action.payload.newStatus);

       const isChange = state.find(item => item.code === action.payload.code && item.statusReturn === action.payload.newStatus);

       if (!isChange) {
         return state.map(item => (item.code === action.payload.code ? { ...item, statusReturn: action.payload.newStatus } : item));
       }

        return state
          .map(item => {
            if (item.code === action.payload.code && item.statusReturn === action.payload.newStatus) {
              return { ...item, quantity: item.quantity + returnChange.quantity };
            }
            return item;
          })
          .filter(item => !(item.code === action.payload.code && item.statusReturn === !action.payload.newStatus)); 
    
    }

    case 'CHANGE_REASON_RETURN': {
      return state.map(item => (item.code === action.payload.code ? { ...item, reason: action.payload.newReason } : item));
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
