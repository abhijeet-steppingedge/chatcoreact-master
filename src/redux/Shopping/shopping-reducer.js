import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  cart: [],
  currentItem: null,
  totalPrice: 0,
  offerPrice: 0,
  offerRate: 0,
  orderType: 0,
  offerRateType: null,
  couponCode: null,
  business: {},
  taxPercentage: 0,
  serviceFeePrice: 0,
  menu: {},
  firstProduct: {},
  paymethodSelected: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = state.cart.find(
        (product) => product.code === action.payload.code,
      );
      if (item) {
        return {
          ...state,
          cart: state.cart.map((item) => item.code === action.payload.code
            ? {
              ...item,
              qty: item.qty + 1,
            }
            : item
          ),
          totalPrice: state.totalPrice + action.payload.product.total_price,
        };

      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload.product, qty: 1 }],
          totalPrice: state.totalPrice + action.payload.product.total_price,
          business: action.payload.business,
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.code !== action.payload.code),
        totalPrice: state.totalPrice - action.payload.productPrice,
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.code === action.payload.code
            ? { ...item, qty: action.payload.qty }
            : item
        ),
        totalPrice: action.payload.operation == 'plus' ? state.totalPrice + action.payload.productPrice : state.totalPrice - action.payload.productPrice,
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case actionTypes.ADD_OFFER_PRICE:
      return {
        ...state,
        offerPrice: action.payload,
      };
    case actionTypes.ADD_OFFER_ID:
      return {
        ...state,
        offerId: action.payload,
      };
    case actionTypes.ADD_OFFER_RATE:
      return {
        ...state,
        offerRate: action.payload,
      };
    case actionTypes.ADD_OFFER_RATE_TYPE:
      return {
        ...state,
        offerRate: action.payload,
      };
    case actionTypes.EMPTY_CART:
      return INITIAL_STATE;
    case actionTypes.ADD_BUSINESS:
      return {
        ...state,
        business: action.payload
      };
    case actionTypes.ADD_COUPON_CODE:
      return {
        ...state,
        couponCode: action.payload
      };
    case actionTypes.ADD_TAX:
      return {
        ...state,
        taxPercentage: action.payload
      };
    case actionTypes.ADD_SERVICE_FEE:
      return {
        ...state,
        serviceFeePrice: action.payload
      };
    case actionTypes.ADD_MENU:
      return {
        ...state,
        menu: action.payload
      };
    case actionTypes.ADD_FIRST_PRODUCT:
      return {
        ...state,
        firstProduct: action.payload
      };
    case actionTypes.ADD_ORDER_TYPE:
      return {
        ...state,
        orderType: action.payload
      };
    case actionTypes.ADD_SELECTED_PAYMETHOD:
      return {
        ...state,
        paymethodSelected: action.payload
      };
    default:
      return state;
  }
};

export default shopReducer;
