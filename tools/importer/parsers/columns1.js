/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first child matching a selector from the element or its subtree
  function findFirst(selector, root = element) {
    return root.querySelector(selector);
  }

  // Helper to get all immediate children matching a selector
  function findAll(selector, root = element) {
    return Array.from(root.querySelectorAll(selector));
  }

  // Find the two main columns: left (opening hours), right (info)
  // The structure is always: opening-time__table (left), opening-time__info (right)
  const leftCol = findFirst('.opening-time__table');
  const rightCol = findFirst('.opening-time__info');

  // Defensive: if not found, fallback to first two direct children
  let leftContent = leftCol;
  let rightContent = rightCol;
  if (!leftContent || !rightContent) {
    const directDivs = element.querySelectorAll(':scope > div > div');
    leftContent = leftContent || directDivs[0];
    rightContent = rightContent || directDivs[1];
  }

  // For left column: grab the whole block (includes title, subtitle, table, caption, warning)
  // For right column: grab the whole block (includes heading, services, staff, contacts, address)

  // Build the table structure
  const headerRow = ['Columns (columns1)'];

  // Second row: two columns, left and right
  const secondRow = [leftContent, rightContent];

  // Create the block table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
