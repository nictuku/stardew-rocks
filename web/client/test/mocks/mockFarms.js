import _ from 'lodash';
import faker from 'faker';

class mockFarms {
  static generateFarms (amount) {
    return _.times(amount, mockFarms.generateFarm);
  }

  static generateFarm () {
    return {
      "ID": faker.random.uuid(),
      "Name": faker.commerce.productName(),
      "Farmer": faker.name.firstName(),
      "Likes": 0,
      "Thumbnail": "thumb.png",
      "History": null,
      "Money": 0
    };
  }
}

export default mockFarms;
