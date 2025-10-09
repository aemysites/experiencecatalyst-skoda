/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns (columns14)'];

  // Defensive: Find the row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get all direct column children
  const cols = Array.from(row.children).filter(col => col.classList.contains('col'));

  // For each column, extract the image and label
  const cells = cols.map(col => {
    // Find image (reference existing element, do not clone)
    const img = col.querySelector('img');
    // Find label (the centered strong text)
    let label = col.querySelector('.component-paragraph strong');
    if (!label) {
      // Fallback: try any strong inside paragraph
      label = col.querySelector('strong');
    }
    // Defensive: wrap label in a div for centering if needed
    let labelDiv;
    if (label) {
      labelDiv = document.createElement('div');
      labelDiv.style.textAlign = 'center';
      labelDiv.appendChild(label);
    }
    // Compose cell: image above label
    const cellContent = [];
    if (img) cellContent.push(img);
    if (labelDiv) cellContent.push(labelDiv);
    // If both missing, insert empty cell
    if (!img && !labelDiv) cellContent.push(document.createTextNode(''));
    return cellContent;
  });

  // Table rows: header, then one row with all columns
  const tableRows = [headerRow, cells];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
