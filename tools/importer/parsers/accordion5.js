/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion rows
  const rows = Array.from(element.querySelectorAll('.lfr-layout-structure-item-row .row'));

  // Header row: single column with block name
  const headerRow = ['Accordion (accordion5)'];

  // Each row: extract left (title) and right (content)
  const tableRows = rows.map(row => {
    const cols = row.querySelectorAll(':scope > .col');
    let titleCell = '';
    let contentCell = '';
    if (cols.length === 2) {
      // Title: find rich text or paragraph block in left col
      const titleCandidate = cols[0].querySelector('.component-paragraph, [data-lfr-editable-type="rich-text"]');
      titleCell = titleCandidate || cols[0];
      // Content: find video block in right col
      const videoCandidate = cols[1].querySelector('.video-url, .video-container, .lfr-layout-structure-item-basic-component-video');
      contentCell = videoCandidate || cols[1];
    } else {
      // Fallback: whole row as title, empty content
      titleCell = row;
      contentCell = '';
    }
    return [titleCell, contentCell];
  });

  // Build the table
  const cells = [headerRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
