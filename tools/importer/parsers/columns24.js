/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns24)'];

  // Find all immediate column divs in the row
  const row = element.querySelector(':scope > div.row');
  let columns = [];
  if (row) {
    const colDivs = row.querySelectorAll(':scope > div');
    // Only include columns with actual content (anchor/button)
    columns = Array.from(colDivs)
      .map((col) => {
        const btn = col.querySelector('a');
        return btn ? btn : null;
      })
      .filter((cell) => cell);
  }

  // If no columns found, fallback to a single empty cell
  if (columns.length === 0) {
    columns = [''];
  }

  // Compose the table data
  const tableData = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
