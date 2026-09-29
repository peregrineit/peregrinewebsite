// Company facts supplied by the owner. Used by the Organization JSON-LD (layout.tsx),
// /contact and the footer so they always match.
export const office = {
  streetAddress: 'Suite 115, H-160, BSI Business Park, Sector 63',
  addressLocality: 'Noida',
  addressRegion: 'Uttar Pradesh',
  // TODO(owner): add the PIN code (postalCode) for the Noida office.
  postalCode: undefined as string | undefined,
  addressCountry: 'IN',
  countryName: 'India',
};

/** One-line address for visible text. */
export const officeAddressLine = [
  office.streetAddress,
  office.addressLocality,
  office.addressRegion,
  office.postalCode,
  office.countryName,
]
  .filter(Boolean)
  .join(', ');

export const officeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddressLine)}`;

// Phone: none published (owner decision pending; TODO(owner) if a number should be listed).
