
 import 'babel-polyfill';
import {game, GAME_START_TIME, GAME_EXTEND_TIME,
        AUDIO} from './game';
import {addClass, removeClass} from './classes';
import {camera} from './camera';
import {share} from './share';
import {isMobile, isIOS, isChromeIOS, getQueryParam} from './utils';

export const VIEWS = {
  LOADING: 'loading',
  QUIT: 'quit',
  ABOUT: 'about',
  LANDING: 'landing',
  CAMERA: 'camera',
  COUNTDOWN: 'countdown',
  COUNTDOWN3: 'countdown3',
  COUNTDOWN2: 'countdown2',
  COUNTDOWN1: 'countdown1',
  COUNTDOWN0: 'countdown0',
  SLEUTH: 'sleuth',
  FOUND_X_ITEMS: 'foundxitems',
  FOUND_NO_ITEMS: 'foundnoitems',
  FOUND_ALL_ITEMS: 'foundallitems',
  FOUND_ITEM: 'founditem'
};

const SELECTORS = {
  VIEWS_LOADING: '.view__loading--js',
  VIEWS_QUIT: '.view__quit--js',
  VIEWS_ABOUT: '.view__about--js',
  VIEWS_LANDING: '.view__landing--js',
  VIEWS_CAMERA: '.view__camera--js',
  VIEWS_COUNTDOWN: '.view__countdown--js',
  VIEWS_COUNTDOWN3: '.view__countdown__3--js',
  VIEWS_COUNTDOWN2: '.view__countdown__2--js',
  VIEWS_COUNTDOWN1: '.view__countdown__1--js',
  VIEWS_COUNTDOWN0: '.view__countdown__0--js',
  VIEWS_SLEUTH: '.view__sleuth--js',
  VIEWS_FOUND_X_ITEMS: '.view__found-x-items--js',
  VIEWS_FOUND_NO_ITEMS: '.view__found-no-items--js',
  VIEWS_FOUND_ALL_ITEMS: '.view__found-all-items--js',
  VIEWS_FOUND_ITEM: '.view__found-item--js',
  PREDICTION_RESULTS_EL: '.view__camera__prediction-results--js',
  START_GAME_BTN: '.landing__play-btn--js',
  REPLAY_GAME_BTN: '.play-again-btn--js',
  CLOSE_BTN: '.view__info-bar__close-btn--js',
  ABOUT_BTN: '.view__info-bar__about-btn--js',
  HOME_BTN: '.view__info-bar__home-btn--js',
  CAMERA_QUIT_BTN: '.view__camera__quit-btn--js',
  QUIT_CANCEL_BTN: '.quit-cancel-btn--js',
  QUIT_BTN: '.quit-btn--js',
  NEXT_EMOJI_BTN: '.next-emoji-btn--js',
  SLEUTH_EMOJI: '.view__sleuth__emoji--js',
  SLEUTH_SPEAKING_EL: '.view__sleuth__speaking--js',
  STATUS_BAR_EMOJI_EL: '.view__status-bar__find__emoji--js',
  COUNTDOWN_EMOJI_EL: '.view__countdown__0__emoji--js',
  CAMERA_FLASH_EL: '.camera__capture-flash--js',
  CAMERA_CAPTURE_EL: '.camera__capture-wrapper--js',
  CAMERA_DESKTOP_MSG_EL: '.view__camera__desktop-msg',
  TIMER_EL: '.view__status-bar__info__timer--js',
  TIMER_FLASH_EL: '.view__status-bar__info__timer-flash--js',
  TIMER_COUNTDOWN_EL: '.view__countdown__0__find-time-val--js',
  SCORE_EL: '.view__status-bar__info__score--js',
  NR_FOUND_EL: '.view__found-x-items__nr-found--js',
  NR_MAX_FOUND_EL: '.view__found-all-items__nr-found--js',
  EMOJI_FOUND_LIST: '.view__found-x-items__emojis--js',
  EMOJI_MAX_FOUND_LIST: '.view__found-all-items__emojis--js',
  LANDING_DESKTOP_MSG_EL: '.view__landing__desktop-msg--js',
  LANDING_PLATFORM_MSG_EL: '.view__landing__platform-msg--js',
  LANDING_INFO_MSG_EL: '.view__landing__intro--js',
  AGE_DISCLAIMER_MSG_EL: '.view__landing__age-msg--js',
  CAMERA_FPS_EL: '.view__camera__fps--js',
  LANG_SELECTOR_EL: '.view__landing__lang-selector',
};

const CSS_CLASSES = {
  SLIDE_UP: 'slideUp',
  SLIDE_DOWN: 'slideDown'
};

const GAME_OUTCOME = {
  WIN: 'Win',
  END: 'End'
};

export const GAME_STRINGS = {
  CAMERA_NO_ACCESS: 'Hey! To play you’ll need to enable camera access in ' +
      'your browser address bar 👆. Your camera is how you’ll ' +
      'find emojis in the real world. We won’t store any ' +
      'images from your camera. 👍',
  SAFARI_WEBVIEW: '🚨 To play this game, please open it directly in Safari. ' +
      'If needed, copy/paste or type the URL into the address bar. ' +
      'https://g.co/emojiscavengerhunt 🚨',
  CAMERA_GENERAL_ERROR: 'It looks like your browser or device doesn’t ' +
      'support this experiment. It’s designed to work best ' +
      'on mobile (iOS/Safari or Android/Chrome). 😭'
};

export interface ViewsListTypes {
  [index: string]: HTMLElement;
}

export class Ui {

  viewsList: ViewsListTypes;
  startGameBtn: HTMLButtonElement;
  predictionResultsEl: HTMLElement;
  replayGameBtns: NodeListOf<Element>;
  nextEmojiBtn: HTMLElement;
  closeAboutBtn: HTMLElement;
  homeBtns: NodeListOf<Element>;
  aboutBtns: NodeListOf<Element>;
  cameraQuitBtn: HTMLElement;
  quitCancelBtn: HTMLElement;
  quitBtn: HTMLElement;
  sleuthEmojiEl: HTMLImageElement;
  sleuthSpeakingEl: HTMLElement;
  statusBarEmojiEl: HTMLImageElement;
  countdownEmojiEl: HTMLImageElement;
  cameraFlashEl: HTMLElement;
  cameraCaptureEl: HTMLElement;
  cameraDesktopMsgEl: HTMLElement;
  timerEl: HTMLElement;
  timerFlashEl: HTMLElement;
  timerCountdownEl: HTMLElement;
  scoreEl: HTMLElement;
  nrEmojisFoundEl: HTMLElement;
  nrMaxEmojisFoundEl: HTMLElement;
  emojisFoundListEl: HTMLElement;
  emojisMaxFoundListEl: HTMLElement;
  landingDesktopMsgEl: HTMLElement;
  landingPlatformMsgEl: HTMLElement;
  landingInfoMsgEl: HTMLElement;
  ageDisclaimerMsgEl: HTMLElement;
  cameraFPSEl: HTMLElement;
  langSelectorEl: HTMLElement;
  sleuthSpeakingPrefixes: Array<string>;
  activeView: string;
  prevActiveView: string;

  constructor() {
    this.viewsList = {
      [VIEWS.LOADING]: document.querySelector(SELECTORS.VIEWS_LOADING),
      [VIEWS.QUIT]: document.querySelector(SELECTORS.VIEWS_QUIT),
      [VIEWS.ABOUT]: document.querySelector(SELECTORS.VIEWS_ABOUT),
      [VIEWS.LANDING]: document.querySelector(SELECTORS.VIEWS_LANDING),
      [VIEWS.CAMERA]: document.querySelector(SELECTORS.VIEWS_CAMERA),
      [VIEWS.COUNTDOWN]: document.querySelector(SELECTORS.VIEWS_COUNTDOWN),
      [VIEWS.COUNTDOWN3]: document.querySelector(SELECTORS.VIEWS_COUNTDOWN3),
      [VIEWS.COUNTDOWN2]: document.querySelector(SELECTORS.VIEWS_COUNTDOWN2),
      [VIEWS.COUNTDOWN1]: document.querySelector(SELECTORS.VIEWS_COUNTDOWN1),
      [VIEWS.COUNTDOWN0]: document.querySelector(SELECTORS.VIEWS_COUNTDOWN0),
      [VIEWS.SLEUTH]: document.querySelector(SELECTORS.VIEWS_SLEUTH),
      [VIEWS.FOUND_X_ITEMS]:
          document.querySelector(SELECTORS.VIEWS_FOUND_X_ITEMS),
      [VIEWS.FOUND_NO_ITEMS]:
          document.querySelector(SELECTORS.VIEWS_FOUND_NO_ITEMS),
      [VIEWS.FOUND_ALL_ITEMS]:
          document.querySelector(SELECTORS.VIEWS_FOUND_ALL_ITEMS),
      [VIEWS.FOUND_ITEM]: document.querySelector(SELECTORS.VIEWS_FOUND_ITEM)
    };

    this.startGameBtn = document.querySelector(SELECTORS.START_GAME_BTN);
    this.replayGameBtns = document.querySelectorAll(SELECTORS.REPLAY_GAME_BTN);
    this.nextEmojiBtn = document.querySelector(SELECTORS.NEXT_EMOJI_BTN);
    this.closeAboutBtn = document.querySelector(SELECTORS.CLOSE_BTN);
    this.aboutBtns = document.querySelectorAll(SELECTORS.ABOUT_BTN);
    this.homeBtns = document.querySelectorAll(SELECTORS.HOME_BTN);
    this.cameraQuitBtn = document.querySelector(SELECTORS.CAMERA_QUIT_BTN);
    this.quitCancelBtn = document.querySelector(SELECTORS.QUIT_CANCEL_BTN);
    this.quitBtn = document.querySelector(SELECTORS.QUIT_BTN);
    this.sleuthEmojiEl = document.querySelector(SELECTORS.SLEUTH_EMOJI);
    this.sleuthSpeakingEl =
        document.querySelector(SELECTORS.SLEUTH_SPEAKING_EL);
    this.statusBarEmojiEl =
        document.querySelector(SELECTORS.STATUS_BAR_EMOJI_EL);
    this.countdownEmojiEl =
        document.querySelector(SELECTORS.COUNTDOWN_EMOJI_EL);
    this.cameraFlashEl = document.querySelector(SELECTORS.CAMERA_FLASH_EL);
    this.cameraCaptureEl = document.querySelector(SELECTORS.CAMERA_CAPTURE_EL);
    this.cameraDesktopMsgEl =
        document.querySelector(SELECTORS.CAMERA_DESKTOP_MSG_EL);
    this.timerEl = document.querySelector(SELECTORS.TIMER_EL);
    this.timerFlashEl = document.querySelector(SELECTORS.TIMER_FLASH_EL);
    this.timerCountdownEl =
        document.querySelector(SELECTORS.TIMER_COUNTDOWN_EL);
    this.scoreEl = document.querySelector(SELECTORS.SCORE_EL);
    this.nrEmojisFoundEl = document.querySelector(SELECTORS.NR_FOUND_EL);
    this.nrMaxEmojisFoundEl = document.querySelector(SELECTORS.NR_MAX_FOUND_EL);
    this.emojisFoundListEl = document.querySelector(SELECTORS.EMOJI_FOUND_LIST);
    this.emojisMaxFoundListEl =
        document.querySelector(SELECTORS.EMOJI_MAX_FOUND_LIST);
    this.predictionResultsEl =
        document.querySelector(SELECTORS.PREDICTION_RESULTS_EL);
    this.landingDesktopMsgEl =
        document.querySelector(SELECTORS.LANDING_DESKTOP_MSG_EL);
    this.landingPlatformMsgEl =
        document.querySelector(SELECTORS.LANDING_PLATFORM_MSG_EL);
    this.landingInfoMsgEl =
        document.querySelector(SELECTORS.LANDING_INFO_MSG_EL);
    this.ageDisclaimerMsgEl =
        document.querySelector(SELECTORS.AGE_DISCLAIMER_MSG_EL);
    this.cameraFPSEl = document.querySelector(SELECTORS.CAMERA_FPS_EL);
    this.langSelectorEl = document.querySelector(SELECTORS.LANG_SELECTOR_EL);

    this.sleuthSpeakingPrefixes = [
      'Is that a ',
      'Do I see a ',
      'Do I spy a ',
      'Did I just see a ',
      'Was that a ',
      'I think I saw a ',
      'Am I seeing a ',
      'Could that be a ',
      'Did I spot a ',
      'Might I see a '
    ];

    this.activeView = VIEWS.LANDING;
    this.prevActiveView = this.activeView;
  }


  init() {
    this.setPlatformMessages();
    this.setCameraFacing();
    this.addEvents();

    if (getQueryParam('about') === 'true') {
      this.showView(VIEWS.ABOUT);
    }
  }

  setPlatformMessages() {
    if (isMobile()) {
      if (isChromeIOS()) {
        this.startGameBtn.disabled = true;
        addClass(this.viewsList[VIEWS.LANDING], 'not-supported');
        this.landingPlatformMsgEl.style.display = 'block';
        this.ageDisclaimerMsgEl.style.display = 'none';
      }
    } else {
      this.landingDesktopMsgEl.style.display = 'block';
      this.cameraDesktopMsgEl.style.display = 'block';
    }
  }

  setCameraFacing() {
    if (!isMobile()) {
      camera.setFrontFacingCamera();
    }
  }


  addEvents() {

    window.addEventListener('popstate', (event: Event) => {
      this.hideView(VIEWS.ABOUT);
    });

    if (this.startGameBtn) {
      this.startGameBtn.addEventListener('click', () => {
        if (game.firstRun) {
          game.setupAudioSources();
        }
        game.initGame();

        (<any>window).gtag('event', 'Click', {
          'event_category': 'Button',
          'event_label': 'Let\'s Play'
        });
      });
    }

    if(this.replayGameBtns.length > 0) {

      for (const item of Array.from(this.replayGameBtns)) {
        item.addEventListener('click', () => {
          game.restartGame();

          (<any>window).gtag('event', 'Click', {
            'event_category': 'Button',
            'event_label': 'Play Again'
          });
        });
      }
    }

    if (this.nextEmojiBtn) {
      this.nextEmojiBtn.addEventListener('click',
          this.nextEmojiBtnClick.bind(this));
    }

    if (this.cameraQuitBtn) {
      this.cameraQuitBtn.addEventListener('click', () => {
        game.pauseGame();
        this.showView(VIEWS.QUIT);

        (<any>window).gtag('event', 'Click', {
          'event_category': 'Link',
          'event_label': 'Quit (in-game)'
        });
      });
    }

    if (this.quitCancelBtn) {
      this.quitCancelBtn.addEventListener('click', () => {
        this.hideView(VIEWS.QUIT);
        game.resumeGame();
      });
    }

    if (this.quitBtn) {
      this.quitBtn.addEventListener('click', () => {
        game.resetGame();
        this.hideView(VIEWS.QUIT);
        this.showView(VIEWS.LANDING);

        (<any>window).gtag('event', 'Click', {
          'event_category': 'Link',
          'event_label': 'Quit (confirm)'
        });
      });
    }

    if (this.closeAboutBtn) {
      this.closeAboutBtn.addEventListener('click', () => {
        this.hideView(VIEWS.ABOUT);
        history.replaceState({page: '/'}, 'Emoji Scavenger Hunt', '/');
      });
    }

    if(this.homeBtns.length > 0) {
      for (const item of Array.from(this.homeBtns)) {
        item.addEventListener('click', () => {
          game.resetGame();
          if (this.activeView === VIEWS.FOUND_ALL_ITEMS) {
            this.resetCameraAfterFlash();
          }
          if (this.activeView === VIEWS.FOUND_NO_ITEMS ||
            this.activeView === VIEWS.FOUND_X_ITEMS ||
            this.activeView === VIEWS.FOUND_ALL_ITEMS) {
              removeClass(this.viewsList[this.activeView],
                  CSS_CLASSES.SLIDE_DOWN);
          } else {
            this.hideView(this.activeView);
          }

          this.showView(VIEWS.LANDING);

          (<any>window).gtag('event', 'Click', {
            'event_category': 'Icon',
            'event_label': 'Home'
          });
        });
      }
    }

    if(this.aboutBtns.length > 0) {
      for (const item of Array.from(this.aboutBtns)) {
        item.addEventListener('click', () => {
          this.showView(VIEWS.ABOUT);
          history.pushState({page: 'about'}, 'Emoji Scavenger Hunt - About',
              '?about=true');
          (<any>window).gtag('event', 'Click', {
            'event_category': 'Icon',
            'event_label': 'About'
          });
        });
      }
    }

    if (this.langSelectorEl) {
      this.langSelectorEl.addEventListener('change', (e) => {
        let url = (<HTMLInputElement>e.target).value;
        window.location.href = url;
      });
    }
  }

  /**
 
   * @returns
   */
  get sleuthSpeakingFoundItMsg(): string {
    return `Hey you found <img class="view__sleuth__speaking__emoji"` +
           `src="${game.currentEmoji.path}"` +
           `alt="${game.currentEmoji.emoji} icon"/>\u00A0!`;
  }

  /**
 
   * @returns
   */
  get sleuthSpeakingFoundItMsgEmojiName(): string {
    return `Hey you found ${game.currentEmoji.name}\u00A0!`;
  }

  /**
  
   * @returns
   */
  get sleuthSpeakingFoundXMsg(): string {
    return `Nice job. You found ${game.score.toString()} ` +
           `${game.score === 1 ? `item.` : `items.`}`;
  }

  /**
  
   * @returns
   */
  get sleuthSpeakingFoundNoMsg(): string {
    return 'Oh no! Your time is up.';
  }

  /**
   * @returns 
   */
  get sleuthSpeakingFoundAllMsg(): string {
    return 'You did it!';
  }

  /**
  
   * @returns
   */
  get sleuthSpeakingSeeingMsg(): string {
    let randomIndex = Math.floor(this.sleuthSpeakingPrefixes.length *
        Math.random());
    return this.sleuthSpeakingPrefixes[randomIndex] +
           game.topItemGuess.toString() + ' ?';
  }

  /**
   * @param value 
   * @param updateCountDownTimer
   */
  updateTimer(value: number, updateCountDownTimer = false,
        addFlashAnimation = false) {
    if (addFlashAnimation) {
      this.timerEl.textContent = value.toString();
      this.timerFlashEl.textContent = value.toString();

      const timerFlashAnimationEnded = (e: Event) => {
        this.timerFlashEl.style.display = 'none';
        removeClass(this.timerFlashEl, 'flash');
        this.timerFlashEl.removeEventListener('animationend',
            timerFlashAnimationEnded);
      };
      this.timerFlashEl.style.display = 'block';
      this.timerFlashEl.addEventListener('animationend',
          timerFlashAnimationEnded);
      addClass(this.timerFlashEl, 'flash');
    } else {
      this.timerEl.textContent = value.toString();
    }

    if (updateCountDownTimer) {
      this.timerCountdownEl.textContent = value.toString() +
          `${game.timer === 1 ? ` second.` : ` seconds.`}`;
    }
  }

  /**
   * @param value
   */
  delayedUpdateTimer(value: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.updateTimer(value);
        resolve(value);
      }, 70);
    });
  }

  /**
   * @async
   */
  async extendTimer() {
    game.playAudio(AUDIO.TIMER_INCREASE, true);
    let maxTimer = ((game.timer + 1) + GAME_EXTEND_TIME) + 1;
    for (let i = game.timer + 2; i < maxTimer; i++) {
      await this.delayedUpdateTimer(i);
    }
    game.pauseAudio(AUDIO.TIMER_INCREASE);
    game.timer = maxTimer - 1;
  }

 
  updateScore() {
    this.scoreEl.textContent = game.score.toString();
  }

  
  setSleuthSpeakerText(msg: string, msgMarkup = false) {

    if (msgMarkup) {
      this.sleuthSpeakingEl.innerHTML = msg;
    } else {
      this.sleuthSpeakingEl.textContent = msg;
    }

    this.sleuthSpeakingEl.style.display = 'block';
  }

  resetSleuthSpeakerText() {
    this.sleuthSpeakingEl.textContent = '';
  }

  hideSleuthSpeakerText() {
    this.sleuthSpeakingEl.style.display = 'none';
    this.sleuthSpeakingEl.textContent = '';
  }

  setNrEmojisFound() {
    this.nrEmojisFoundEl.textContent =
        `${game.score.toString()} ${game.score === 1 ? `item` : `items`}`;
    this.nrMaxEmojisFoundEl.textContent =
    `${game.score.toString()} ${game.score === 1 ? `item` : `items`}`;
  }

  /**
   * @param endGamePhotos
   * @param screen
   */
  setEmojisFoundList(
      endGamePhotos: Array<HTMLImageElement>, screen: string) {

    let emojiFoundString = '';
    let spacer = '';

    let photoContainer = document.createElement('div');
    addClass(photoContainer, 'view__found-x-items__emojis__grid');
    addClass(photoContainer, 'view__found-x-items__emojis__grid--js');

    if (endGamePhotos[0].width >= endGamePhotos[0].height) {
      addClass(photoContainer, 'landscape');
    } else {
      addClass(photoContainer, 'portrait');
    }

    for (let i = 0; i < game.emojisFound.length; i++) {
      let item = game.emojisFound[i];
      spacer = (i === game.emojisFound.length - 1) ? '' : ' ';
      emojiFoundString = emojiFoundString + item.emoji + spacer;

      let figure = document.createElement('figure');
      addClass(figure, 'view__found-x-items__emojis__grid__item');
      addClass(figure, 'view__found-x-items__emojis__grid__item--js');
      figure.appendChild(endGamePhotos[i]);

      let caption = document.createElement('figcaption');
      figure.appendChild(caption);

      let emojiImg = document.createElement('img');
      emojiImg.src = item.path;
      emojiImg.alt = item.name;
      caption.appendChild(emojiImg);

      photoContainer.appendChild(figure);
    }

    while (this.emojisFoundListEl.firstChild) {
      this.emojisFoundListEl.removeChild(this.emojisFoundListEl.firstChild);
    }

    while (this.emojisMaxFoundListEl.firstChild) {
      this.emojisMaxFoundListEl.removeChild(
          this.emojisMaxFoundListEl.firstChild);
    }

    addClass(photoContainer, 'photos-' + game.emojisFound.length);

    this.emojisFoundListEl.appendChild(photoContainer.cloneNode(true));
    this.emojisMaxFoundListEl.appendChild(photoContainer);

    (<any>window).gtag('event', `${screen}`, {
      'event_category': 'Game',
      'event_label': `${emojiFoundString}`
    });


    share.setTwitterShareLinks(emojiFoundString);
  }


  nextEmojiBtnClick() {
    game.nextEmoji();
    this.resetSleuthSpeakerText();
    this.hideSleuthSpeakerText();
    this.showCountdown();
    this.resetCameraAfterFlash();
    this.hideView(VIEWS.FOUND_ITEM);
  }

  cameraFlash() {
    const animationEnded = (e: Event) => {
      addClass(this.cameraFlashEl,'freeze');
      addClass(this.cameraCaptureEl, 'capture');
      this.cameraFlashEl.removeEventListener('animationend', animationEnded);
    };
    this.cameraQuitBtn.style.display = 'none';
    this.cameraFlashEl.addEventListener('animationend', animationEnded);
    addClass(this.cameraFlashEl,'flash');
  }

  resetCameraAfterFlash() {
    if (game.cameraPaused) {
      camera.unPauseCamera();
    }
    this.cameraQuitBtn.style.display = 'block';
    removeClass(this.cameraFlashEl,'flash');
    removeClass(this.cameraFlashEl,'freeze');
    removeClass(this.cameraCaptureEl, 'capture');
  }

  /**
   * @param view
   */
  setActiveView(view: string) {
    this.prevActiveView = this.activeView;
    this.activeView = view;
  }

  /**
  
    @param emojiPath
   */
  setActiveEmoji(emojiPath: string) {
    this.statusBarEmojiEl.src = emojiPath;
    this.countdownEmojiEl.src = emojiPath;
  }

  /**
   * @param msg
   */
  setLandingInfoMsg(msg: string) {
    this.landingInfoMsgEl.textContent = msg;
  }

  /**
   * @param view 
   */
  hideView(view: string) {
    this.viewsList[view].style.display = 'none';
    this.activeView = this.prevActiveView;
  }

  /**
   @param view 
   */
  showView(view: string) {
    this.viewsList[view].style.display = 'flex';
    this.prevActiveView = this.activeView;
    this.activeView = view;
  }

  showItemFoundView() {
    this.showView(VIEWS.FOUND_ITEM);
    this.updateScore();
    this.extendTimer();
  }

  showNoItemsFoundView() {
    game.pauseGame();
    game.playAudio(AUDIO.FAIL);

    let msg = this.sleuthSpeakingFoundNoMsg;
    this.setSleuthSpeakerText(msg);
    if (isIOS()) {
      game.spriteSpeak('timeup');
    } else {
      game.speak(msg);
    }
    this.setActiveView(VIEWS.FOUND_NO_ITEMS);
    this.slideView(VIEWS.FOUND_NO_ITEMS, CSS_CLASSES.SLIDE_DOWN,
        false).then(values => {
      this.updateTimer(GAME_START_TIME);
    });
  }


  showXItemsFoundView(endGamePhotos: Array<HTMLImageElement>) {
    game.pauseGame();
    this.setNrEmojisFound();
    this.setEmojisFoundList(endGamePhotos, GAME_OUTCOME.END);
    game.playAudio(AUDIO.END);

    let msg = this.sleuthSpeakingFoundXMsg;
    this.setSleuthSpeakerText(msg);
    if (isIOS()) {
      game.spriteSpeak('found ' + game.emojisFound.length);
    } else {
      game.speak(msg);
    }
    this.setActiveView(VIEWS.FOUND_X_ITEMS);
    this.slideView(VIEWS.FOUND_X_ITEMS, CSS_CLASSES.SLIDE_DOWN,
        false).then(values => {
      this.updateTimer(GAME_START_TIME);
    });
  }

  showAllItemsFoundView(endGamePhotos: Array<HTMLImageElement>) {
    game.pauseGame();
    game.playAudio(AUDIO.WIN);
    this.setNrEmojisFound();
    this.setEmojisFoundList(endGamePhotos, GAME_OUTCOME.WIN);

    let msg = this.sleuthSpeakingFoundAllMsg;
    this.setSleuthSpeakerText(msg);
    if (isIOS()) {
      game.spriteSpeak('found ' + game.emojisFound.length);
    } else {
      game.speak(msg);
    }
    this.setActiveView(VIEWS.FOUND_ALL_ITEMS);
    this.slideView(VIEWS.FOUND_ALL_ITEMS, CSS_CLASSES.SLIDE_DOWN, false);
  }

  /**
   * @param view 
   * @param cssClass 
   * @param hideAfter
   * @returns 
   */
  slideView(view: string, cssClass: string, hideAfter = true) {
    return new Promise(resolve => {

      const transitionEnded = (e: Event) => {

        if (hideAfter) {
          this.hideView(view);
          removeClass(this.viewsList[view], cssClass);
        }
        this.viewsList[view].removeEventListener('transitionend',
            transitionEnded);
        resolve(true);
      };

      this.viewsList[view].addEventListener('transitionend', transitionEnded);
      addClass(this.viewsList[view], cssClass);
    });
  }

  /**

   * @param count 
   *
   * @returns
   */
  countDown(count: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setActiveView(count);
        if (count === VIEWS.COUNTDOWN0) {
          camera.unPauseCamera();

          this.slideView(count, CSS_CLASSES.SLIDE_UP).then(value => {
            if (!game.isRunning) {
              game.startGame();
            }

            this.resetCountDownUi();
            this.setActiveView(VIEWS.CAMERA);
          });
        } else {
          this.hideView(count);
        }
        resolve(count);
      }, 1000);
    });
  }

  
  resetCountDownUi() {
    this.hideView(VIEWS.COUNTDOWN);
    this.showView(VIEWS.COUNTDOWN3);
    this.showView(VIEWS.COUNTDOWN2);
    this.showView(VIEWS.COUNTDOWN1);
    this.showView(VIEWS.COUNTDOWN0);
  }

  /**
   * @async
   */
  async showCountdown() {

    game.playAudio(AUDIO.COUNTDOWN);

    if (game.isRunning) {
      game.isRunning = false;
    }

    this.updateTimer(game.timer, true);

    if (this.activeView === VIEWS.LANDING ||
        this.activeView === VIEWS.LOADING) {
      this.hideView(VIEWS.LANDING);
      this.hideView(VIEWS.LOADING);
    }

    if (this.activeView === VIEWS.FOUND_NO_ITEMS ||
      this.activeView === VIEWS.FOUND_X_ITEMS ||
      this.activeView === VIEWS.FOUND_ALL_ITEMS) {
        removeClass(this.viewsList[this.activeView], CSS_CLASSES.SLIDE_DOWN);
    }
    this.showView(VIEWS.COUNTDOWN);

    await this.countDown(VIEWS.COUNTDOWN3);
    await this.countDown(VIEWS.COUNTDOWN2);
    await this.countDown(VIEWS.COUNTDOWN1);
    await this.countDown(VIEWS.COUNTDOWN0);
  }

   resetScrollPositions() {
     this.viewsList[VIEWS.FOUND_ALL_ITEMS].scrollTop = 0;
     this.viewsList[VIEWS.FOUND_X_ITEMS].scrollTop = 0;
   }
}

export let ui = new Ui();
