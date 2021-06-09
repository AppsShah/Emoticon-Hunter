

const SELECTORS = {
  SHARE_LINK_EL: '.social-share-link',
  SHARE_LINK_ALL_ITEMS_TWITTER: '.view__found-all-items__social__tritter--js',
  SHARE_LINK_X_ITEMS_TWITTER: '.view__found-x-items__social__tritter--js'
};

const TWITTER_SHARING_MSG_PREFIX =
    'https://twitter.com/intent/tweet?text=I%20found%20';
const TWITTER_SHARING_MSG_SUFFIX =
    '%20in%20the%20real%20world.%20How%20many%20can%20you%20find%3F%20' +
    'Start%20your%20search%20at&hashtags=AIExperiments,tensorflowjs' +
    '&url=https%3A%2F%2Fg.co%2Femojiscavengerhunt';

export class Share {
  shareLinks: NodeListOf<Element>;
  shareLinkAllItemsTwitter: HTMLLinkElement;
  shareLinkXItemsTwitter: HTMLLinkElement;

  constructor() {
    this.shareLinks = document.querySelectorAll(SELECTORS.SHARE_LINK_EL);
    this.shareLinkAllItemsTwitter =
        document.querySelector(SELECTORS.SHARE_LINK_ALL_ITEMS_TWITTER);
    this.shareLinkXItemsTwitter =
        document.querySelector(SELECTORS.SHARE_LINK_X_ITEMS_TWITTER);
  }

  /**
   * Registers a click event for all sharing elements that open the share link
   * in a new window centered on the screen.
   */
  initShareElements() {
    if (!!this.shareLinks) {
      for (let i = 0; i < this.shareLinks.length; i++) {
        let shareEl = <HTMLLinkElement>this.shareLinks[i];
        shareEl.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const left = screen.width / 2 - (600 / 2);
          const top = screen.height / 2 - (600 / 2);
          window.open(shareEl.href, '',
              'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,left=' +
              left + ',top=' + top + ',height=600,width=600');
        });
      }
    }
  }

  /**
   * @param emojiList
   */
  setTwitterShareLinks(emojiList: string) {
    let encodedEmojiList = encodeURIComponent(emojiList);
    this.shareLinkAllItemsTwitter.href = TWITTER_SHARING_MSG_PREFIX +
        encodedEmojiList + TWITTER_SHARING_MSG_SUFFIX;
    this.shareLinkXItemsTwitter.href = TWITTER_SHARING_MSG_PREFIX +
        encodedEmojiList + TWITTER_SHARING_MSG_SUFFIX;
  }
}

export let share = new Share();
