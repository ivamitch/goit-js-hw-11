import SimpleLightbox from 'simplelightbox';
import refs from './js/refs';
import { getImages } from './js/get_images';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';


let currentPage = 1;

const gallery = new SimpleLightbox('.gallery a');



refs.search.addEventListener('submit', onSearch);
refs.loadmore.addEventListener('click', onLoad);

async function onSearch(event) {
  // event.preventDefault();
  // refs.card.innerHTML = '';
  // refs.loadmore.hidden = true;
  // const value = refs.search.elements.searchQuery.value;
  // if (!value.trim()) {
  //   return;
  // }
  // refs.search.elements[1].disabled = true; 
  try {
    event.preventDefault();
  refs.card.innerHTML = '';
  refs.loadmore.hidden = true;
  const value = refs.search.elements.searchQuery.value;
  if (!value.trim()) {
    return;
  }
  refs.search.elements[1].disabled = true;
    const cardImage = await getImages(value.trim());
    refs.search.elements[1].disabled = false; 
    gallery.refresh(); 
//----------------------from get_images----------------------------
    if (
  refs.card.childNodes.length + 1 > datas.totalHits &&
  datas.totalHits !== 0
) {
  refs.loadmore.hidden = true;
  refs.header.classList.remove('opac');
  Notiflix.Notify.warning(
    "We're sorry, but you've reached the end of search results."
  );
}

if (!datas.hits.length) {
  refs.loadmore.hidden = true;
  refs.header.classList.remove('opac');
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  return;
}
//----------------------from get_images----------------------------
    return cardImage;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred. Please try again.');
  }
}

async function onLoad() {
  currentPage += 1;
  try {
    const addImages = await getImages(
      refs.search.elements.searchQuery.value,
      currentPage
    );
    gallery.refresh(); 

//----------------------------------------
    if (
  refs.card.childNodes.length + 1 > datas.totalHits &&
  datas.totalHits !== 0
) {
  refs.loadmore.hidden = true;
  refs.header.classList.remove('opac');
  Notiflix.Notify.warning(
    "We're sorry, but you've reached the end of search results."
  );
}

if (!datas.hits.length) {
  refs.loadmore.hidden = true;
  refs.header.classList.remove('opac');
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  return;
}
//----------------------------------------

    return addImages;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred. Please try again.');
  }
}

