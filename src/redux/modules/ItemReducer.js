const initialState = [];

const ItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_ITEMS':
      const items = action.payload;
      console.log(items);
      return items;

    default:
      return state;
  }
};

export default ItemsReducer;
