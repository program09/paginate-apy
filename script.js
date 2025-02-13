/************************************************************************************
 * Copyright (c) 2025 Yordi Alcantara
 *
 * This software is released under an Open Source License.
 * You are free to use, modify, and distribute this software in accordance with the
 * terms of the license included in this project.
 *
 * Author: Yordi Alcantara
 * Repository: [Insert Repository URL Here]
 *
 * This code is provided "as is", without warranty of any kind, express or implied,
 * including but not limited to the warranties of merchantability, fitness for a 
 * particular purpose, and noninfringement. In no event shall the author be liable 
 * for any claim, damages, or other liability, whether in an action of contract, 
 * tort, or otherwise, arising from, out of, or in connection with the software 
 * or the use or other dealings in the software.
 ************************************************************************************/

class Paginator {
  /**
   * Crea una instancia del paginador.
   * @param {HTMLElement} container - Contenedor donde se renderizará el paginador.
   * @param {number} totalPages - Número total de páginas.
   * @param {number} currentPage - Página inicial.
   * @param {function} onPageChange - Callback que se ejecuta al cambiar de página.
   */
  constructor({container, totalPages = 0, currentPage = 1, onPageChange = () => { }}) {
    if (typeof container === 'string') {
      this.container = document.getElementById(container);
      if (!this.container) {
        throw new Error(`Contenedor con ID "${container}" no encontrado.`);
      }
    } else if (container instanceof HTMLElement) {
      this.container = container;
    } else {
      throw new Error('El contenedor debe ser un ID (string) o un elemento HTMLElement.');
    }

    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.onPageChange = onPageChange;
    this.pageClickCallback = null; // Callback personalizado para clics

    this.render();
  }

  /**
   * Renderiza el paginador.
   */
  render() {
    this.container.innerHTML = '';

    // Información del rango actual y total
    const info = document.createElement('p');
    info.innerHTML = `Página <strong>${this.currentPage}</strong> / <strong>${this.totalPages}</strong>`;
    info.setAttribute('id', 'current-page-info');
    this.container.appendChild(info);

    // Crear el contenedor de navegación
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-end';

    // Botón "Anterior"
    const prevButton = document.createElement('li');
    prevButton.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`;
    prevButton.innerHTML = `
      <a class="page-link" href="#" data-page="${this.currentPage - 1}" aria-label="Anterior">
        &laquo;
      </a>
    `;
    ul.appendChild(prevButton);

    // Agregar elipsis si hay muchas páginas antes del grupo actual
    const rangeStart = Math.max(1, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages, this.currentPage + 2);

    if (rangeStart > 1) {
      const firstPage = document.createElement('li');
      firstPage.className = 'page-item';
      firstPage.innerHTML = `
        <a class="page-link" href="#" data-page="1">1</a>
      `;
      ul.appendChild(firstPage);

      if (rangeStart > 2) {
        const ellipsis = document.createElement('li');
        ellipsis.className = 'page-item disabled';
        ellipsis.innerHTML = `<span class="page-link">...</span>`;
        ul.appendChild(ellipsis);
      }
    }

    // Páginas cercanas a la página actual
    for (let i = rangeStart; i <= rangeEnd; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      `;
      ul.appendChild(pageItem);
    }

    // Agregar elipsis si hay muchas páginas después del grupo actual
    if (rangeEnd < this.totalPages) {
      if (rangeEnd < this.totalPages - 1) {
        const ellipsis = document.createElement('li');
        ellipsis.className = 'page-item disabled';
        ellipsis.innerHTML = `<span class="page-link">...</span>`;
        ul.appendChild(ellipsis);
      }

      const lastPage = document.createElement('li');
      lastPage.className = 'page-item';
      lastPage.innerHTML = `
        <a class="page-link" href="#" data-page="${this.totalPages}">${this.totalPages}</a>
      `;
      ul.appendChild(lastPage);
    }

    // Botón "Siguiente"
    const nextButton = document.createElement('li');
    nextButton.className = `page-item ${this.currentPage === this.totalPages ? 'disabled' : ''}`;
    nextButton.innerHTML = `
      <a class="page-link" href="#" data-page="${this.currentPage + 1}" aria-label="Siguiente">
        &raquo;
      </a>
    `;
    ul.appendChild(nextButton);

    nav.appendChild(ul);
    this.container.appendChild(nav);

    // Manejar clics en las páginas
    ul.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedPage = parseInt(e.target.getAttribute('data-page'), 10);
        if (!isNaN(selectedPage)) {
          // Llamar al callback de clic si está definido
          if (this.pageClickCallback) {
            this.pageClickCallback(selectedPage);
          }

          // Cambiar de página si es diferente de la actual
          if (selectedPage !== this.currentPage) {
            this.setPage(selectedPage);
          }
        }
      });
    });
  }

  /**
   * Cambia la página actual y ejecuta el callback.
   * @param {number} page - Nueva página.
   */
  setPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.onPageChange(page);
      this.render();
    }
  }

  /**
   * Selecciona automáticamente una página por ID.
   * @param {number} pageId - Número de la página.
   */
  selectPageById(pageId) {
    this.setPage(pageId);
  }

  /**
   * Actualiza el número total de páginas.
   * @param {number} newTotalPages - Nuevo número total de páginas.
   */
  updateTotalPages(newTotalPages) {
    this.totalPages = newTotalPages;
    if (this.currentPage > newTotalPages) {
      this.setPage(newTotalPages);
    } else {
      this.render();
    }
  }

  /**
   * Obtiene la página actual.
   * @returns {number} - Página actual.
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Define un callback que se ejecutará al hacer clic en cualquier página.
   * @param {function} callback - Callback que recibe el número de la página clickeada.
   */
  click(callback) {
    this.pageClickCallback = callback;
  }

  /**
   * Destruye la instancia del paginador.
   * Limpia el contenedor y elimina los eventos asociados.
   */
  destroy() {
    // Eliminar los eventos asociados a los enlaces
    this.container.querySelectorAll('.page-link').forEach(link => {
      link.removeEventListener('click', this.pageClickCallback);
    });

    // Limpiar el contenido del contenedor
    this.container.innerHTML = '';

    // Resetear las propiedades de la instancia
    this.container = null;
    this.totalPages = 0;
    this.currentPage = 0;
    this.onPageChange = null;
    this.pageClickCallback = null;
  }

}


