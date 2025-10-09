/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: always block name
  const headerRow = ['Hero (hero2)'];

  // 2. Background image row
  let bgImgEl = null;
  const style = element.getAttribute('style') || '';
  const bgUrlMatch = style.match(/url\(([^)]+)\)/);
  if (bgUrlMatch) {
    const url = bgUrlMatch[1];
    bgImgEl = document.createElement('img');
    bgImgEl.src = url;
  }
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row: heading, subheading, paragraph, CTA
  // Find main heading (h1)
  let heading = element.querySelector('h1');
  let contentCell = [];
  if (heading) contentCell.push(heading);

  // Find subheading and paragraph - look for all rich text blocks
  // In this source HTML, the subheading and paragraph are inside a single rich-text editable block
  // So we need to grab all elements with [data-lfr-editable-type="rich-text"]
  element.querySelectorAll('[data-lfr-editable-type="rich-text"]').forEach((el) => {
    // Avoid duplicate heading
    if (el !== heading && el.textContent.trim()) {
      contentCell.push(el);
    }
  });

  // Find CTA (link with button text)
  const btnLink = element.querySelector('a.btn__link');
  const btnText = element.querySelector('.btn__text');
  if (btnLink && btnText) {
    const ctaWrap = document.createElement('div');
    ctaWrap.appendChild(btnLink.cloneNode(true));
    ctaWrap.appendChild(btnText.cloneNode(true));
    contentCell.push(ctaWrap);
  } else if (btnLink) {
    contentCell.push(btnLink.cloneNode(true));
  }

  // Compose the content row
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build the table and replace
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
