/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns10)'];

  // Defensive: Get all top-level columns (should be two: image, content)
  // Find the row with columns
  const row = element.querySelector('.row');
  if (!row) return;
  const cols = row.querySelectorAll(':scope > .col');
  if (cols.length < 2) return;

  // --- Left column: image ---
  let imageCell = null;
  const img = cols[0].querySelector('img');
  if (img) {
    imageCell = img;
  } else {
    // fallback: use the whole col if no image found
    imageCell = cols[0];
  }

  // --- Right column: text and button ---
  // Find heading, paragraph, and button
  const contentCol = cols[1];
  const heading = contentCol.querySelector('h4');
  const paragraph = contentCol.querySelector('p');
  const button = contentCol.querySelector('a');

  // Compose right cell content
  const rightCellContent = [];
  if (heading) rightCellContent.push(heading);
  if (paragraph) rightCellContent.push(paragraph);
  if (button) rightCellContent.push(button);

  // Table rows
  const cells = [
    headerRow,
    [imageCell, rightCellContent]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
