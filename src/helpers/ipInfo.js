const axios = require('axios');

const { IPINFO_TOKEN = '91e42b236db8d8' } = process.env;

const getUrl = ip => `http://ipinfo.io/${ip}/geo`;

const getIpInfo = async ip => axios(getUrl(ip), { headers: { 'Authorization' : `bearer ${IPINFO_TOKEN}` } });

module.exports = {
  getIpInfo,
}

