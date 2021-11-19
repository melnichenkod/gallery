const galleryClassName = 'gallery';
const galleryLineClassName = 'gallery-line';
const gallerySlideClassName = 'gallery-slide'

class Gallery{
  constructor(element, options = {}) {
    this.containerNode = element;
    this.size = element.childElementCount;
    this.currentSlide = 0;
    this.manageHTML = this.manageHTML.bind(this)
    this.manageHTML();
  }
  manageHTML() {
    this.containerNode.classList.add(galleryClassName);
    this.containerNode.innerHTML = `
      <div class="${galleryLineClassName}">
        ${this.containerNode.innerHTML}
      </div>
    `;
    this.lineNode = this.containerNode.querySelector(`.${galleryLineClassName}`);
    this.slideNodes = Array.from(this.lineNode.children).map(childNode => 
      wrapElementByDiv({
        element: childNode,
        className: gallerySlideClassName
      })
    )
      console.log(this.slideNodes);
  }
}

//Helpers
function wrapElementByDiv({element, className}) {
  const wrapperNode = document.createElement('div');
  wrapperNode.classList.add(className);
  element.parentNode.insertBefore(wrapperNode, element);
  console.log(element.parentNode);
  wrapperNode.appendChild(element);
  return wrapperNode;
}
