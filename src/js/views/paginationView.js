import icons from '../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // TODO: refactor button generate
    // page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button class="btn--inline pagination__btn--next" data-page-to="${
        curPage + 1
      }">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
          <button class="btn--inline pagination__btn--prev" data-page-to="${
            curPage - 1
          }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
`;
    }

    // Other page
    if (curPage < numPages) {
      return `
      <button class="btn--inline pagination__btn--prev" data-page-to="${
        curPage - 1
      }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-page-to="${
            curPage + 1
          }">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
      `;
    }

    // page 1, and there are NO other pages
    return '';
  }

  addClickHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('button')) return;

      e.preventDefault();

      const button = e.target.closest('button');

      const pageTo = +button.dataset.pageTo;

      handler(pageTo);
    });
  }
}

export default new PaginationView();
