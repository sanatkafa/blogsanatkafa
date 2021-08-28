const { getApiUrl } = require('../lib/get-url');
const { isProductionEnvironment } = require('../lib/utils');

const TAG_PATH = '/tags';
const POST_PATH = '/posts';
const MEDIA_PATH = '/media';

let instance;

class APIService {
  constructor() {
    this.nonce = undefined;
  }

  getPosts = (params = {}, isAuthenticated = false) =>
    this.makeAPIRequest(POST_PATH, params, isAuthenticated);

  getTags = (params = {}, isAuthenticated = false) =>
    this.makeAPIRequest(TAG_PATH, params, isAuthenticated);

  getMedia = (params = {}, isAuthenticated = false) =>
    this.makeAPIRequest(MEDIA_PATH, params, isAuthenticated);

  getPostByID = (id, params = {}, isAuthenticated = false) =>
    this.makeAPIRequest(`${POST_PATH}/${id}`, params, isAuthenticated);

  getTagByID = (id, params = {}, isAuthenticated = false) =>
    this.makeAPIRequest(`${TAG_PATH}/${id}`, params, isAuthenticated);

  getMediaByID = (id, params = {}, isAuthenticated = false) =>
    this.makeAPIRequest(`${MEDIA_PATH}/${id}`, params, isAuthenticated);

  attachNonce = (params) => {
    if (!isProductionEnvironment() && !this.nonce) {
      throw Error(`Authenticated response attempted, however, no nonce has been set. To fix this error, call 
      setNonce(THE_NONCE) before making authenticated requests.`);
    }

    return { ...params, _wpnonce: this.nonce };
  };

  setNonce = (nonce) => {
    this.nonce = nonce;
  };

  makeAPIRequest = (resourcePath, params, isAuthenticated) => {
    const baseAPIURL = getApiUrl();
    const url = new URL(`${baseAPIURL}/wp-json/wp/v2${resourcePath}`);
    const headers = isAuthenticated ? { credentials: 'include' } : {};
    const paramsWithNonce = isAuthenticated ? this.attachNonce(params) : params;
    Object.keys(paramsWithNonce).forEach((key) =>
      url.searchParams.append(key, paramsWithNonce[key])
    );
    return fetch(url, headers).then((response) => response.json());
  };

  static getInstance = () => {
    if (!instance) {
      instance = new APIService();
    }

    return instance;
  };
}

export default APIService;
