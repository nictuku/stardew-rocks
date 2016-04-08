import _ from 'lodash';
import faker from 'faker';

class farms {
  static generateFarms (amount) {
    return _.times(amount, this.generateFarm());
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

export default farms;
