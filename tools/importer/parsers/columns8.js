/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns8)'];

  // Find the row containing columns
  const rowDiv = element.querySelector('.row');
  if (!rowDiv) return;

  // Get all direct column divs
  const columnDivs = Array.from(rowDiv.querySelectorAll(':scope > .col'));
  if (!columnDivs.length) return;

  // For each column, extract the image and the text
  const columns = columnDivs.map(col => {
    // Find the first image (should be SVG or PNG/JPG)
    const img = col.querySelector('img');
    // Find the first paragraph
    const p = col.querySelector('p');
    // Defensive: only include if present
    const cellContent = [];
    if (img) cellContent.push(img);
    if (p) cellContent.push(p);
    // If both missing, add an empty string to avoid empty cell
    if (!img && !p) cellContent.push('');
    return cellContent;
  });

  // Table rows: header, then one row of columns
  const rows = [
    headerRow,
    columns
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element
  element.replaceWith(table);
}
