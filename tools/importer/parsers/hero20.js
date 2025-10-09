/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the hero image (background)
  function getHeroImage(el) {
    // Find <img> inside <picture>
    const picture = el.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract headline and subheadline
  function getHeroTextContent(el) {
    // Headline
    let headline = null;
    const headlineWrap = el.querySelector('.hero-image__headline');
    if (headlineWrap) {
      // Find the first <p> inside headlineWrap
      const p = headlineWrap.querySelector('p');
      if (p) headline = p;
    }
    // Subheadline
    let subheadline = null;
    const subheadlineWrap = el.querySelector('.hero-image__subheadline');
    if (subheadlineWrap) {
      const p = subheadlineWrap.querySelector('p');
      if (p) subheadline = p;
    }
    // Compose content
    const content = [];
    if (headline) content.push(headline);
    if (subheadline) content.push(subheadline);
    return content;
  }

  // Find the hero-image root
  const heroImageRoot = element.querySelector('.hero-image');

  // 1. Table header row
  const headerRow = ['Hero (hero20)'];

  // 2. Image row
  let imageCell = '';
  if (heroImageRoot) {
    const imgEl = getHeroImage(heroImageRoot);
    if (imgEl) imageCell = imgEl;
  }
  const imageRow = [imageCell];

  // 3. Content row (headline, subheadline, CTA if present)
  let contentCell = '';
  if (heroImageRoot) {
    const content = getHeroTextContent(heroImageRoot);
    if (content.length) contentCell = content;
  }
  const contentRow = [contentCell];

  // Build the table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
