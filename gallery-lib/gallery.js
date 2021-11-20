const galleryClassName = 'gallery';
const galleryLineClassName = 'gallery-line';
const gallerySlideClassName = 'gallery-slide'

class Gallery{
  constructor(element, options = {}) {
    this.containerNode = element;
    this.size = element.childElementCount;
    this.currentSlide = 0;
    this.currentSlideWasChanged = false;

    this.manageHTML = this.manageHTML.bind(this);
    this.setParameters = this.setParameters.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.resizeGallery = this.resizeGallery.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.dragging = this.dragging.bind(this);
    this.setStylePosition = this.setStylePosition.bind(this);

    this.manageHTML();
    this.setParameters();
    this.setEvents();
    this.destroyEvents();
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
    this.x = -this.currentSlide * this.width;
    this.lineNode.style.width = `${this.size * this.width}px`;
    Array.from(this.slideNodes).forEach((slideNode) => {
      slideNode.style.width = `${this.width}px`
    })
  }
  setEvents(){
    this.debouncedResizeGallery = debounce(this.resizeGallery);
    window.addEventListener('resize', this.debouncedResizeGallery);
    this.lineNode.addEventListener('pointerdown', this.startDrag);
    window.addEventListener('pointerup', this.stopDrag)
  }
destroyEvents(){
  window.removeEventListener('resize', this.debouncedResizeGallery)
}
  resizeGallery(){
    console.log(11);
    this.setParameters();
  }
  startDrag(evt) {
    this.currentSlideWasChanged = false;
    this.clickX = evt.pageX;
    this.startX = this.x;
    window.addEventListener('pointermove', this.dragging);
  }
  stopDrag() {
    window.removeEventListener('pointermove', this.dragging);
    console.log(this.currentSlide);
  }
  dragging(evt) {
    this.dragX = evt.pageX;
    const dragShift = this.dragX - this.clickX;
    this.x = this.startX + dragShift;
    this.setStylePosition();
    // Change active slide
    if (
      dragShift > 20 &&
      dragShift > 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide > 0
      ) {
        this.currentSlideWasChanged = true;
        this.currentSlide = this.currentSlide - 1;
      }
      if (
        dragShift < -20 &&
        dragShift < 0 &&
        !this.currentSlideWasChanged &&
        this.currentSlide < this.size - 1
      ) {
        this.currentSlideWasChanged = true;
        this.currentSlide = this.currentSlide + 1;
      }
  }
  setStylePosition() {
    this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`
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
