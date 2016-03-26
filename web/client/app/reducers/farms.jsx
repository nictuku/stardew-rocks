import 'isomorphic-fetch';
import reduxApi, {transformers} from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

const farms = reduxApi({
  farms: 'api/farms',
  farm: 'api/farm/:id'
}).use("fetch", adapterFetch(fetch));

export default farms;
