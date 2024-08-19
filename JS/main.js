window.onload = () => {
  const currentPageTile = document.querySelector('.pagination-tile.current');

  // Remove click event from current blog pagination number
  currentPageTile.addEventListener('click', (evt) => {
    evt.preventDefault();
  })
}