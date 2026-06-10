/**
 * Filter contacts by name or email (case‑insensitive)
 */
export const filterContacts = (contacts, searchTerm) => {
  if (!searchTerm) return contacts;
  const lowerTerm = searchTerm.toLowerCase();
  return contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerTerm) ||
      c.email.toLowerCase().includes(lowerTerm)
  );
};

/**
 * Group contacts by phone (in case duplicates exist, merge purchases)
 * Optional – only needed if you have a purchases array.
 */
export const groupContactsByPhone = (contacts) => {
  if (!contacts) return [];
  console.log(contacts);
  const map = new Map();
  contacts.forEach((contact) => {
    const key = contact.phone;
    if (!map.has(key)) {
      map.set(key, {
        ...contact,
        purchases: contact.purchases || [],
      });
    } else {
      const existing = map.get(key);
      existing.purchases.push(...(contact.purchases || []));
    }
  });
  return Array.from(map.values());
};