class buttonAnimationsUI {
  buttonsInUseArr = document.querySelectorAll(".btn-clear");

  styleProperty = "--btn-clear-span-width";

  mouseOverWidth = "30%";
  mouseOutWidth = "15%";

  activateAnimation() {
  
    this.buttonsInUseArr.forEach((btn) => {

      btn.addEventListener("mouseover", () => this._handleMouseOver(btn));

      btn.addEventListener("mouseout", () => this._handleMouseOut(btn));
    });
  }

  _handleMouseOver(button) {
    button.style.setProperty(this.styleProperty, this.mouseOverWidth);
  }

  _handleMouseOut(button) {
    button.style.setProperty(this.styleProperty, this.mouseOutWidth);
  }
}

export default new buttonAnimationsUI();

