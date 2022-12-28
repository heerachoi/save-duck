import { v4 as uuidv4 } from "uuid";

const MODIFY_PROFILE = "MODIFY_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";

//Action Creator

export const modifyProfile = (payload) => {
  return {
    type: MODIFY_PROFILE,
    payload,
  };
};

export const updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload,
  };
};

//Initial State

const initialState = [
  {
    id: uuidv4(),
    profile: "닉네임 없음",
    modify: false,
  },
];

//Reducer

const profileName = (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_PROFILE:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            modify: !item.modify,
          };
        } else {
          return item;
        }
      });
    case UPDATE_PROFILE:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            comment: action.payload.comment,
          };
        } else {
          return item;
        }
      });

    default:
      return state;
  }
};

export default profileName;
