const { getIpInfo } = require('../helpers/ipInfo');

module.exports = async function (req, res, next) {
  const { browser, version, os, platform } = req.useragent;
  console.log(req.host)
  //const host = req.host;
  const host = '199.80.124.61';
  const ipInfo = await getIpInfo(host);
  req.locals = {
    user: {
      geo: {
        ...ipInfo,
      },
      client: {
        browser,
        version,
        os,
        platform
      }
    }
  };
  next();
};
