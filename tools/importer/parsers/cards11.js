/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards11) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards11)'];

  // 2. Find all card columns (each col is a card)
  const cardCols = element.querySelectorAll('.row > .col');
  const rows = [];

  cardCols.forEach((col) => {
    // Defensive: Find the card container inside the column
    const cardContainer = col.querySelector('.image-text-cta');
    if (!cardContainer) return;

    // --- Image/Icon ---
    const imgWrap = cardContainer.querySelector('.image-text-cta__picture img');
    let imageCell = null;
    if (imgWrap) {
      imageCell = imgWrap;
    }

    // --- Text Content ---
    const textWrap = cardContainer.querySelector('.image-text-cta__description');
    let textCellContent = [];
    if (textWrap) {
      // Title
      const title = textWrap.querySelector('h2');
      if (title) textCellContent.push(title);
      // Description (text-cta__content)
      const desc = textWrap.querySelector('.text-cta__content');
      if (desc) textCellContent.push(desc);
      // CTA Button (link)
      const linkWrap = textWrap.querySelector('.text-cta__link a');
      const btnText = textWrap.querySelector('.text-cta__link .btn__text');
      if (linkWrap) {
        // Compose CTA: link with button text if present
        const cta = document.createElement('a');
        cta.href = linkWrap.href;
        cta.textContent = btnText ? btnText.textContent : linkWrap.textContent;
        if (linkWrap.target) cta.target = linkWrap.target;
        textCellContent.push(cta);
      }
    }
    // Defensive: If nothing found, fallback to col text
    if (textCellContent.length === 0) {
      textCellContent.push(col.textContent.trim());
    }

    // Add row: [image, text content]
    rows.push([
      imageCell,
      textCellContent
    ]);
  });

  // Compose table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
