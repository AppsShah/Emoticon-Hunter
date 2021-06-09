
/**
  @param el 
  @param className
 */
function addClass(el: HTMLElement, className: string) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
  }
}

/**
  @param el
  @param className 
 */
function removeClass(el: HTMLElement, className: string) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' +
      className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

/**
  @param el
  @param className
 */
function hasClass(el: HTMLElement, className: string) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

export {addClass, removeClass, hasClass};
