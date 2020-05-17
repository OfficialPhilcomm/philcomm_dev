class ProgressBar {
  constructor(steps, completedSteps) {
    this.steps = [];

    let element = document.createElement("progressbar");
    let progressbartrack = document.createElement("div");
    progressbartrack.className = "progressbar-track";
    element.appendChild(progressbartrack);
    this.element = element;

    for(let i in steps) {
      let step = new ProgressBarStep(steps[i]);
      if(i < completedSteps) step.setComplete();
      if(i == completedSteps) step.setActive();
      this.steps.push(step);
    }

    for(let progressbarstep of this.steps) {
      this.element.appendChild(progressbarstep.element);
    }
  }

  complete(completedSteps) {
    for(let i in this.steps) {
      let step = this.steps[i];
      if(i < completedSteps) step.setComplete();
      if(i == completedSteps) step.setActive();
    }
  }
}

class ProgressBarStep {
  constructor(name, complete) {
    this.name = name
    let element = document.createElement("div");
    element.className = "progressbar-step";
    element.innerHTML = name;
    this.element = element;
  }

  setActive() {
    this.element.classList.add("is-active");
  }

  setComplete() {
    this.element.classList.remove("is-active");
    this.element.classList.add("is-complete");
  }
}
