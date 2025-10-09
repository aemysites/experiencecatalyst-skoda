/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Video (video38)'];

  // Extract all text content from the source html, including hidden error messages
  let cellContent = '';
  const errorMsg = element.querySelector('.error-message');
  if (errorMsg) {
    cellContent = Array.from(errorMsg.querySelectorAll('p'))
      .map(p => p.textContent.trim())
      .filter(Boolean)
      .join(' ');
  }

  const rows = [
    headerRow,
    [cellContent],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
