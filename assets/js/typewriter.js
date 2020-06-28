class TypeWriter {
  constructor(element, stringList, period) {
    this.stringList = stringList;
    this.element = element;
    this.loopNum = this.getRandomID();
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  }

  getRandomID() {
    return Math.floor(Math.random() * this.stringList.length);
  }

  tick() {
    var i = this.loopNum % this.stringList.length;
    var fullTxt = this.stringList[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = this.txt;
    var delta = 120 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      let newString = this.getRandomID();
      while(newString === this.loopNum) {
        newString = this.getRandomID();
      }
      this.loopNum = newString;
      delta = 500;
    }

    let that = this;
    setTimeout(function() {
      that.tick();
    }, delta);
  }
}

window.onload = function() {
  var elements = document.getElementsByTagName('typewriter');
  for (let i = 0; i<elements.length; i++) {
    var stringList = elements[i].getAttribute('data-strings');
    var period = elements[i].getAttribute('data-period');
    if (stringList) {
      new TypeWriter(elements[i], JSON.parse(stringList), period);
    }
  }
};
