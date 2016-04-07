import _ from 'lodash';

export const getFarms = () => {
  return new Promise(resolve => {
    fetch('api/farms').then(res => resolve(res.json()));
  });
};

export const getFarmInfo = (id) => {
  return new Promise(resolve => {
    fetch(`api/farminfo/${id}`).then(res => resolve(res.json()));
  });
};

export const getFarm = (id) => {
  return new Promise(resolve => {
    fetch(`api/farm/${id}`)
      .then(res => res.json())
      .then(farm => {
        getFarmInfo(id).then(info => {
          resolve(_.assign(farm, info));
        });
      });
  });
};

export const searchFarms = (query) => {
  console.log("search query", query);
  return new Promise(resolve => {
    fetch(`api/search/farm?q=${query}`)
      .then(res => resolve(res.json()));
  });
};
