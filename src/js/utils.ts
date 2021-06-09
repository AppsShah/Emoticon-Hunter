
/**
 @returns
 */
function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * @returns
 */
function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

/**
 * @returns
 */
function isMobile() {
  return isIOS() || isAndroid();
}

/**
 * @returns
 */
function isChrome() {
  return navigator.userAgent.indexOf('Chrome') !== -1;
}

/**
 @returns 
 */
function isChromeIOS() {
  return isIOS() && /CriOS/i.test(navigator.userAgent);
}

/**
 @param query 
 */
function getQueryParam(query: string) {
  if ('URLSearchParams' in (<any>window)) {
    let params = (new URL(document.URL)).searchParams;
    return params.get(query);
  } else {
    if (!(<any>window).location.search) {
      return undefined;
    }
    let m = new RegExp(query +
        '=([^&]*)').exec((<any>window).location.search.substring(1));
    if (!m) {
      return undefined;
    }
    return decodeURIComponent(m[1]);
  }
}

export {getQueryParam, isMobile, isIOS, isAndroid, isChrome, isChromeIOS};

