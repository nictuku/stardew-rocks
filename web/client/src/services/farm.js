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

export class FarmDate {
  /* eslint-disable no-magic-numbers */
  static parseRegex = /([0-9]{1,2})[a-z]{2}\sof\s([A-Za-z]*),\sYear\s([0-9]*)/;

  static Seasons = {
    Spring: 0,
    Summer: 1,
    Fall: 2,
    Winter: 3
  };

  static NumToSeasons = [
    'Spring',
    'Summer',
    'Fall',
    'Winter'
  ];

  static daysToString (days) {
    const year = Math.floor(days / 112),
        season = Math.floor(days % 112 / 28),
        day = days % 112 % 28;
    return `${day} ${FarmDate.NumToSeasons[season]}, Year ${year + 1}`;
  }

  constructor (string) {
    const [, day, season, year] = string.match(FarmDate.parseRegex);
    this.day = parseInt(day);
    this.season = season;
    this.year = parseInt(year);
    this.string = string;
  }

  toString () {
    return this.string;
  }

  valueOf () {

    return this.day + (FarmDate.Seasons[this.season] * 28) + (this.year - 1) * 112;
  }
  /* eslint-enable */
}
