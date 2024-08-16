window.onload = () => {
  const currentPageTile = document.querySelector('.pagination-tile.current');

  currentPageTile.addEventListener('click', (evt) => {
    evt.preventDefault();
  })
}