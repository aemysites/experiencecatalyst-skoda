/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns34)'];

  // Find the row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Find all direct column divs
  const columns = Array.from(row.children).filter(col => col.classList.contains('col'));

  // For each column, collect its image and paragraph content
  const cells = columns.map(col => {
    // Find image (icon)
    const imgWrapper = col.querySelector('.component-image');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Find paragraph (label + link)
    const paraWrapper = col.querySelector('.component-paragraph');
    let para = paraWrapper ? paraWrapper : null;

    // Build cell content: image above, then paragraph
    const cellContent = [];
    if (img) cellContent.push(img);
    if (para) cellContent.push(para);
    return cellContent;
  });

  // Build the table rows
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
