const galleryClassName = 'gallery';
const galleryLineClassName = 'gallery-line';
const gallerySlideClassName = 'gallery-slide'

class Gallery{
  constructor(element, options = {}) {
    this.containerNode = element;
    this.size = element.childElementCount;
    this.currentSlide = 0;
    this.manageHTML = this.manageHTML.bind(this);
    this.setParameters = this.setParameters.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.resizeGallery = this.resizeGallery.bind(this);


    this.manageHTML();
    this.setParameters();
    this.setEvents()
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
  setParameters(){
    const coordContainer = this.containerNode.getBoundingClientRect();
    // console.log(coordContainer);
    this.width = coordContainer.width;
    this.lineNode.style.width = `${this.size * this.width}px`;
    Array.from(this.slideNodes).forEach((slideNode) => {
      slideNode.style.width = `${this.width}px`
    })
  }
  setEvents(){
    window.addEventListener('resize', debounce(this.resizeGallery))
  }
  resizeGallery(){
    console.log(11);
    this.setParameters();
  }
}

//Helpers
function wrapElementByDiv({element, className}) {
  const wrapperNode = document.createElement('div');
  wrapperNode.classList.add(className);
  element.parentNode.insertBefore(wrapperNode, element);
  wrapperNode.appendChild(element);
  return wrapperNode;
}

function debounce(func, time = 100){
  let timer;
  return function(event){
    clearTimeout(timer);
    timer = setTimeout(func, time, event)
  }
}
