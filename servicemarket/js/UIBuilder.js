class UIBuilder {
  static fromObject(uiJSON) {
    let elementType = uiJson.type || "div";

    let domElement = document.createElement(elementType);

    if(uiJSON.id) domElement.id = uiJSON.id;
    if(uiJSON.class) domElement.className = uiJSON.class;
    if(uiJSON.src) domElement.src = uiJSON.src;
    if(uiJSON.content) domElement.innerHTML = uiJSON.content;
    if(uiJSON.children) {
      for(let child of children) {
        domElement.appendChild(fromObject(child));
      }
    }

    return domElement;
  }
}
