/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each column
  function extractCard(col) {
    const link = col.querySelector('a[href]');
    const img = col.querySelector('img');
    const yearHeading = col.querySelector('h4');
    if (!img || !yearHeading) return null;
    let imageEl = img.cloneNode(true);
    let textEl = document.createElement('div');
    textEl.appendChild(yearHeading.cloneNode(true));
    // If the card itself is a link, wrap image in the link for cell 1, and heading in the link for cell 2
    let cell1 = imageEl;
    let cell2 = textEl;
    if (link) {
      const linkEl1 = link.cloneNode(false);
      linkEl1.href = link.href;
      linkEl1.appendChild(imageEl);
      cell1 = linkEl1;
      const linkEl2 = link.cloneNode(false);
      linkEl2.href = link.href;
      linkEl2.appendChild(textEl);
      cell2 = linkEl2;
    }
    return [cell1, cell2];
  }

  // Find all card grid rows
  const cardRows = Array.from(element.querySelectorAll('.row'));
  const cards = [];
  cardRows.forEach(row => {
    const cols = Array.from(row.querySelectorAll('.col')).filter(col => col.querySelector('h4') && col.querySelector('img'));
    cols.forEach(col => {
      const card = extractCard(col);
      if (card) cards.push(card);
    });
  });

  // Compose the table rows
  const headerRow = ['Cards (cards29)'];
  const tableRows = [headerRow];
  cards.forEach(card => {
    tableRows.push(card);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
