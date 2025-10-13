/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero23) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional, none in this case)
  // Row 3: Headline, subheading, CTA (only headline present)

  // --- Model Fields ---
  // <!-- Title -->
  // <!-- Background Image -->
  // <!-- Subheading -->
  // <!-- Call-to-Action -->

  // Helper to find the headline
  let headline = null;
  // Find all h4 elements in the block
  const h4s = element.querySelectorAll('h4');
  if (h4s.length > 0) {
    headline = h4s[0];
  } else {
    // Fallback: try to find any heading or paragraph
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
      headline = headings[0];
    } else {
      const paragraphs = element.querySelectorAll('p');
      if (paragraphs.length > 0) {
        headline = paragraphs[0];
      }
    }
  }

  // Row 1: Block name
  const headerRow = ['Hero (hero23)'];
  // Row 2: Background image (none in this case)
  const imageRow = [''];
  // Row 3: Headline (only headline present)
  const contentRow = [headline ? headline : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Insert model field comments for mapping
  table.rows[2].cells[0].prepend(document.createComment('Title'));
  table.rows[1].cells[0].prepend(document.createComment('Background Image'));
  // Subheading and CTA are not present, but add comments for model completeness
  table.rows[2].cells[0].append(document.createComment('Subheading'));
  table.rows[2].cells[0].append(document.createComment('Call-to-Action'));

  element.replaceWith(table);
}
