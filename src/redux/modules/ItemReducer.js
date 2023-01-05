const initialState = [];

const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_ITEMS':
      const items = action.payload;
      return items;

    default:
      return state;
  }
};

export default ItemsReducer;
