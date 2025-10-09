/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns26)'];

  // Defensive: get all top-level columns (should be two)
  // The source HTML uses Bootstrap grid: .row > .col
  const row = element.querySelector('.row');
  const columns = row ? Array.from(row.children) : [];

  // Helper to extract all content from a column
  function extractColumnContent(col) {
    const content = [];

    // Find all images in column (usually one per column, at the top)
    const images = col.querySelectorAll('img');
    images.forEach(img => content.push(img));

    // Find all headings, paragraphs, lists, and links
    // We'll grab the first rich text container and its children
    const richText = col.querySelector('.component-paragraph');
    if (richText) {
      content.push(richText);
    }

    // Find any button containers (for the right column)
    const btn = col.querySelector('.btn');
    if (btn) {
      content.push(btn);
    }

    return content;
  }

  // Build the second row with one cell per column
  const contentRow = columns.map(col => {
    const colContent = extractColumnContent(col);
    // If only one element, pass it directly; else pass array
    return colContent.length === 1 ? colContent[0] : colContent;
  });

  // Table structure: header row, then content row with two columns
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
