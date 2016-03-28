import {CHANGE_FARM_FILTER} from "../actionTypes";

const intialState = {
  filter: 0,
  filters: [{
    id: 0,
    name: "Popular"
  }, {
    id: 1,
    name: "Recent"
  }]
};

const farmFilter = (state = intialState, action) => {
  switch(action.type) {
  case CHANGE_FARM_FILTER:
    return {
      ...state,
      filter: action.filter
    };
  default:
    return state;
  }
};

export default farmFilter;
