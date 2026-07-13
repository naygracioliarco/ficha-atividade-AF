import { useState, useEffect, useCallback } from 'react';

/** Só barras do miolo (`data-book-page`); a barra do topo não entra — evita virar “4” ao primeiro scroll. */
const BOOK_PAGE_MARKERS = '[data-book-page]';

/**
 * Distância do topo da viewport: o marcador da página precisa subir até aqui
 * para essa página passar a valer (valores menores = troca mais tarde).
 */
function getScrollTriggerY(): number {
  return Math.min(160, Math.max(56, Math.round(window.innerHeight * 0.1)));
}

/**
 * Hook customizado para gerenciar paginação baseada em scroll
 */
export function usePagination(defaultPage: number = 3) {
  const [currentPage, setCurrentPage] = useState(defaultPage);

  useEffect(() => {
    const updateCurrentPage = () => {
      const markerElements = document.querySelectorAll(BOOK_PAGE_MARKERS);
      const triggerY = getScrollTriggerY();

      let visiblePage = defaultPage;

      markerElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const page = parseInt(el.getAttribute('data-book-page') || String(defaultPage), 10);
        if (Number.isNaN(page)) return;
        if (rect.top <= triggerY) {
          visiblePage = Math.max(visiblePage, page);
        }
      });

      setCurrentPage(visiblePage);
    };

    updateCurrentPage();

    window.addEventListener('scroll', updateCurrentPage, { passive: true });
    window.addEventListener('resize', updateCurrentPage);

    const observer = new MutationObserver(updateCurrentPage);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('scroll', updateCurrentPage);
      window.removeEventListener('resize', updateCurrentPage);
      observer.disconnect();
    };
  }, [defaultPage]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setCurrentPage(defaultPage);
    }, 500);
  }, [defaultPage]);

  return {
    currentPage,
    scrollToTop,
  };
}
