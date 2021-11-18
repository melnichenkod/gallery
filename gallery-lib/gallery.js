const galleryClassName = 'gallery';
const galleryLineClassName = 'gallery-line';
const gallerySlideClassName = 'gallery-slide'

class Gallery{
  constructor(element, options = {}) {
    this.conainerNode = element;
    this.size = element.childElementCount;
    this.currentSlide = 0;
    this.manageHTML();
  }
  manageHTML() {
    this.conainerNode.classList.add(galleryClassName)
  }
}
