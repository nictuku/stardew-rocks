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
    fetch(`api/search/farm?q=${query}`)
      .then(res => resolve(res.json()));
  });
};

export const parseFarmDate = (farmDateStr) => {
  const regex = /([0-9]{1,2})[a-z]{2}\sof\s([A-Za-z]*),\sYear\s([0-9]*)/;
  var [, date, season, year] = farmDateStr.match(regex);
  return {date, season, year};
};
