/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero19) block: 1 column, 3 rows
  // Row 1: Block name
  const headerRow = ['Hero (hero19)'];

  // Row 2: Background image (none)
  const bgImageRow = [''];

  // Row 3: Content (headline)
  // Instead of passing the original element, clone its inner HTML into a new div
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = element.innerHTML;
  const contentRow = [contentDiv];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
