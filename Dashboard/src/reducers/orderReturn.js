import { toast } from 'react-toastify';

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

      const newState = [...products].sort((a, b) => a.code.localeCompare(b.code));

      return newState;
    }

    case 'INCREASE_PRODUCT_QUANTITY_RETURN': {
      const products = [...state];
      const data = action.payload;
      const resultProduct = products?.filter(product => product.code === data.code);
      const totalQuantity = resultProduct.reduce((sum, product) => sum + Number(product?.currentQuantity), Number(0));
      if (resultProduct?.length > 0) {
        if (totalQuantity === resultProduct[0].quantity) {
          toast.warn('Số lượng trả hàng đã đạt tối đa');
          return;
        }
      }
      const index = products.findIndex(product => {
        return product.code === data.code && product.statusReturn === data.statusReturn;
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
        return product.code === data.code && product.statusReturn === data.statusReturn;
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

    case 'CHANGE_QUANTITY_PRODUCT_RETURN': {
      const { productDetail, quantity } = action.payload;
      const products = state.map(product =>
        product.code === productDetail?.code && product.statusReturn === productDetail.statusReturn
          ? { ...product, currentQuantity: quantity }
          : product,
      );
      return products;
    }

    case 'CHANGE_STATUS_RETURN': {
      const { code, newStatus } = action.payload;
      if (state?.length === 1) {
        return state.map(item => (item.code === code ? { ...item, statusReturn: newStatus } : item));
      }
      const returnChange = state.find(item => item.code === code && item.statusReturn !== newStatus);

      const isChange = state.some(item => item.code === code && item.statusReturn === newStatus);
      if (!isChange) {
        return state.map(item => (item.code === code ? { ...item, statusReturn: newStatus } : item));
      }
      const statusFind = newStatus === 'OLD' ? 'BROKEN' : 'OLD';
      const newState = state
        .filter(item => !(item?.code === code && item?.statusReturn === statusFind))
        .map(item => {
          if (item.code === code && item.statusReturn === newStatus) {
            return { ...item, currentQuantity: item?.currentQuantity + returnChange?.currentQuantity };
          }
          return item;
        });

      return newState;
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
