class UIBuilder {
  static fromObject(uiJSON) {
    let elementType = uiJSON.type || "div";

    let domElement = document.createElement(elementType);

    if(uiJSON.id) domElement.id = uiJSON.id;
    if(uiJSON.class) domElement.className = uiJSON.class;
    if(uiJSON.src) domElement.src = uiJSON.src;
    if(uiJSON.onclick) domElement.onclick = uiJSON.onclick;
    if(uiJSON.input_type) domElement.type = uiJSON.input_type;
    if(uiJSON.input_pattern) domElement.pattern = uiJSON.input_pattern;
    if(uiJSON.required) domElement.required = uiJSON.required;
    if(uiJSON.select_value) domElement.value = uiJSON.select_value;
    if(uiJSON.min) domElement.min = uiJSON.min;
    if(uiJSON.max) domElement.max = uiJSON.max;
    if(uiJSON.content) domElement.innerHTML = uiJSON.content;
    if(uiJSON.children) {
      for(let child of uiJSON.children) {
        if(child instanceof HTMLElement) {
          domElement.appendChild(child);
        } else {
          domElement.appendChild(UIBuilder.fromObject(child));
        }
      }
    }

    return domElement;
  }
}
