
class StickyNavUI {
  header;
  navbar;
  navHeight;

  constructor() {
    this.header = document.querySelector(".header");
    this.navbar = document.querySelector(".navbar");
    this.navHeight = this.navbar.getBoundingClientRect().height;
  }

  _observerCallback(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      this.navbar.classList.add("pos-fixed");
    } else {
      this.navbar.classList.remove("pos-fixed");
    }
  }

  activateStickyNav() {
    console.log("im observing");

    const headerObserver = new IntersectionObserver(
      this._observerCallback.bind(this),
      {
        root: null,
        threshold: 0,
        rootMargin: `-${this.navHeight}px`,
      }
    );

    headerObserver.observe(this.header);
  }
}

export default new StickyNavUI();
