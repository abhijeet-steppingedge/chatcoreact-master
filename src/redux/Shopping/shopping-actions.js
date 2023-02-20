import * as actionTypes from "./shopping-types";

export const addToCart = (itemID, business) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      business: business,
    },
  };
};

export const removeFromCart = (itemID, productPrice) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
      productPrice: productPrice,
    },
  };
};

export const adjustItemQty = (itemID, qty, operation, productPrice) => {
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty,
      operation,
      productPrice,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};
export const emptyCart = () => {
  return {
    type: actionTypes.EMPTY_CART,
  };
};
export const addBusiness = (business) => {
  return {
    type: actionTypes.ADD_BUSINESS,
    payload: business
  };
};
export const addOfferPrice = (price) => {
  return {
    type: actionTypes.ADD_OFFER_PRICE,
    payload: price
  };
};