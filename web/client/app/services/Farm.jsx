import 'isomorphic-fetch';

export const getFarms = () => {
  return new Promise(resolve => {
    fetch('api/farms').then(res => resolve(res.json()));
  });
};

export const getFarm = (id) => {
  return new Promise(resolve => {
    fetch(`api/farm/${id}`).then(res => resolve(res.json()));
  });
};

export const searchFarms = (query) => {
  return new Promise(resolve => {
    fetch(`api/search/farm?q=${query}`).then(res => resolve(res.json()));
  });
};
