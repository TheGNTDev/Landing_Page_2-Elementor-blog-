// Creates menu interface class from DOM elements:
// menu toggle [button] -> Attributes: [menu-component: "toggle", [menu-data-container: "#Container_ID"]]
// menu data container [container such as ul, ol, nav] ->  Attributes: [menu-component: "container" + id required] 

class navMenuInterface {
  constructor (toggleElement){
    // Toggle button for menu opening and closing state control -> HTML Element
    this.toggle = toggleElement;
    if(toggleElement.getAttribute('menu-data-container') === null) throw new Error('Undefined [menu-data-container] attribute in toggle element.')
    if(!this.toggle.getAttribute('menu-data-container').match(/^#.+/)) throw new Error('Expected "#" character within [menu-data-container] id refference')
    // Data container with open and close state controlled by toggle button -> HTML ELement
    this.container = document.getElementById(this.toggle.getAttribute('menu-data-container').slice(1))
    this.container.toggler = this.toggle
    if(this.container.getAttribute('menu-component') !== 'container') throw new Error('Menu list is expected to have "container" value in [menu-component] attribute')
    // Menu Close button with data container refference -> HMTL ELement \ undefined
    this.closeButton = document.querySelector(`[menu-component="close"][menu-data-container="#${this.container.id}"]`)
    // Menu State
    this.isOpened = false;

    // Close menu on click (If close button exists)
    if(this.closeButton) this.closeButton.addEventListener('click', () => this.closeAction())
    // Toggle menu on click
    this.toggle.addEventListener('click', () => this.toggleAction())
    }

    // Menu opening state
    openAction() {
      this.isOpened = true;
      this.container.classList.add('menu-open')
      this.toggle.setAttribute('aria-expanded', this.isOpened)
    }

    // Menu closing state
    closeAction() {
      this.isOpened = false;
      this.container.classList.remove('menu-open')
      this.toggle.setAttribute('aria-expanded', this.isOpened)
    }

    // Toggle between opening and closing state
    toggleAction() {
      if(this.isOpened) {
        this.closeAction()
        return
      }
      this.openAction()
    }
}

// Create array of all list interfaces in DOM
const navMenuInterfaces = Array.from(document.querySelectorAll('[menu-component="toggle"]')).map(toggle => new navMenuInterface(toggle));

// Track for cursor click outside container menu and toggler to close menu anyways
document.addEventListener('click', (evt) => {
  const openedMenus = Array.from(document.querySelectorAll('.menu-open[menu-component="container"]'))
  
  if(!openedMenus.length) return

  openedMenus.forEach(currentMenu => {
    const currentMenuRect = currentMenu.getBoundingClientRect()
    const currentTogglerRect = currentMenu.toggler.getBoundingClientRect()

    if(
      // Check if cursor click position is inside toggler button
      (evt.clientX < currentTogglerRect.right &&
      evt.clientX > currentTogglerRect.left &&
      evt.clientY < currentTogglerRect.bottom &&
      evt.clientY > currentTogglerRect.top) ||
      // Check if cursor click position is inside menu data container
      (evt.clientX < currentMenuRect.right &&
      evt.clientX > currentMenuRect.left &&
      evt.clientY < currentMenuRect.bottom &&
      evt.clientY > currentMenuRect.top)
      ) return

      // Close menu if click position isn't inside toggle button or nav menu
      navMenuInterfaces.filter(menuInterface => menuInterface.container === currentMenu)[0].closeAction()
  })
})
