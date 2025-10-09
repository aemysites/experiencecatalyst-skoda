/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns18)'];

  // Find the two column divs (direct children of the row)
  const colDivs = Array.from(element.querySelectorAll(':scope > div > div[class*="col"]'));

  // Helper to extract all content from a column
  function extractColumnContent(colDiv) {
    const cellContent = [];
    // Find all image blocks
    const imgBlock = colDiv.querySelector('.lfr-layout-structure-item-image img');
    if (imgBlock) {
      cellContent.push(imgBlock);
    }
    // Find all text blocks (typography)
    const textBlocks = colDiv.querySelectorAll('.lfr-layout-structure-item-typography--kop-rovat- p');
    textBlocks.forEach((p) => {
      cellContent.push(p);
    });
    return cellContent;
  }

  // Build the second row: one cell per column
  const secondRow = colDivs.map((colDiv) => {
    return extractColumnContent(colDiv);
  });

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
