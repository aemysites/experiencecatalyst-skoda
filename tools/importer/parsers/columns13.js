/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope .row > .col'));
  if (columns.length < 1) return;

  // For each column, extract both the link text and button label
  const columnCells = columns.map(col => {
    const btnWrapper = col.querySelector('.btn.btn-primary');
    if (!btnWrapper) return document.createElement('div'); // fallback empty cell

    const link = btnWrapper.querySelector('a.btn__link');
    const span = btnWrapper.querySelector('span.btn__text');

    // Compose cell: include both 'Example Link' and button label
    const cellDiv = document.createElement('div');
    if (link) {
      // Clone the link with its original text
      const linkClone = link.cloneNode(true);
      cellDiv.appendChild(linkClone);
    }
    if (span) {
      // Add the button label as plain text (or styled span)
      const labelSpan = document.createElement('span');
      labelSpan.textContent = span.textContent.trim();
      labelSpan.className = 'btn__text';
      cellDiv.appendChild(labelSpan);
    }
    return cellDiv;
  });

  // Table rows
  const headerRow = ['Columns (columns13)'];
  const contentRow = columnCells;

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
