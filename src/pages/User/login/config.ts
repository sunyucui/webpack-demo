const location = window.location.host || '';
let ssoUrl = 'https://oms.hsmob.com';
let host = 'http://niepan.weimob.com';

if (location.indexOf('.dev.') > 0) {
  ssoUrl = 'http://cas.dev.internal.hsmob.com';
  host = 'http://crm.dev.hsmob.com';
}

if (location.indexOf('.qa.') > 0) {
  ssoUrl = 'https://cas.hsmob.com';
  host = 'http://crm.qa.hsmob.com';
}

if (location.indexOf('.pl.') > 0) {
  host = 'http://nirvana.pl.hsmob.com';
}

export { ssoUrl, host };
