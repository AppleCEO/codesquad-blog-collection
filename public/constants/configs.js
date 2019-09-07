import ACCESS_TOKEN from '../../access-token';

const CONFIGS = {
  // url: './public/resource/localdata.json'
  URL: 'http://13.125.91.246/v1',

  HEADER: new Headers({
    'x-access-token': ACCESS_TOKEN,
    'Content-Type': 'application/json'
  })
};

export default CONFIGS;
