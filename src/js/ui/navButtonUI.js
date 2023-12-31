class NavButtonUI {
  toggleBtn = document.querySelector(".toggle-bars");
  exitBtn = document.querySelector(".x-icon");
  navMenu = document.querySelector(".nav-toggle-menu");

  _toggleBackDrop() {
    const navMenuCont = document.querySelector(".nav-toggle-menu-cont");
    navMenuCont.classList.toggle("backdrop");
  }
  _handleClick(ev) {
    // closest will return null if closest ancestor DNE
    const clickedToggle = ev.target.closest(".toggle-bars");
    const clickedX = ev.target.closest(".x-icon");

    this._toggleBackDrop();

    if (clickedToggle) {
      this.navMenu.style.transform = "translateX(0px)";
    } else if (clickedX) {
      this.navMenu.style.transform = "translateX(-400px)";
    }
  }

  activateNavMenuBtn() {
    [this.toggleBtn, this.exitBtn].forEach((btn) => {
      btn.addEventListener("click", (ev) => this._handleClick(ev));
    });
  }
}

export default new NavButtonUI();
