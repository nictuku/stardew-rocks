import _ from 'lodash';

class mockProps {
  static generateProps (propShape) {
    return _.reduce(propShape, (allProps, props, propType) => {
      let value;
      switch(propType) {
      case 'array':
        value = [];
        break;
      case 'func':
        value = () => {};
        break;
      case 'number':
        value = 0;
        break;
      case 'string':
        value = '';
        break;
      case 'object':
        value = {};
        break;
      }
      return _.chain(props)
        .map(prop => ({[prop]: value}))
        .transform((theseProps, propObj) => _.assign(theseProps, propObj), {})
        .assign(allProps)
        .value();
    }, {});
  }
}

export default mockProps;
