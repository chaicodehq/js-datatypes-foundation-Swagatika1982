/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if (thali === null || typeof thali !== "object" || Array.isArray(thali)) return "";

  const { name, items, price, isVeg } = thali;

  if (typeof name !== "string") return "";
  if (!Array.isArray(items)) return "";
  if (typeof price !== "number" || !Number.isFinite(price)) return "";
  if (typeof isVeg !== "boolean") return "";

  const typeText = isVeg ? "Veg" : "Non-Veg";
  return `${name.toUpperCase()} (${typeText}) - Items: ${items.join(", ")} - Rs.${price.toFixed(
    2
  )}`;
}

export function getThaliStats(thalis) {
  // Your code here

   if (!Array.isArray(thalis) || thalis.length === 0) return null;
    const totalThalis = thalis.length;

  const vegCount = thalis.filter((t) => t && typeof t === "object" && t.isVeg === true).length;
  const nonVegCount = thalis.filter((t) => t && typeof t === "object" && t.isVeg === false).length;

  const prices = thalis
    .map((t) => t?.price)
    .filter((p) => typeof p === "number" && Number.isFinite(p));

  const avgPriceNum =
    prices.length === 0 ? 0 : prices.reduce((sum, p) => sum + p, 0) / prices.length;

  const cheapest = prices.length === 0 ? 0 : Math.min(...prices);
  const costliest = prices.length === 0 ? 0 : Math.max(...prices);

  const names = thalis
    .map((t) => t?.name)
    .filter((n) => typeof n === "string");

  return {
    totalThalis,
    vegCount,
    nonVegCount,
    avgPrice: avgPriceNum.toFixed(2), // string
    cheapest,
    costliest,
    names,
  };
}

export function searchThaliMenu(thalis, query) {
  // Your code here

  if (!Array.isArray(thalis) || typeof query !== "string") return [];

  const q = query.toLowerCase();

  return thalis.filter((t) => {
    if (!t || typeof t !== "object") return false;

    const nameMatch =
      typeof t.name === "string" && t.name.toLowerCase().includes(q);

    const itemMatch =
      Array.isArray(t.items) &&
      t.items.some((item) => typeof item === "string" && item.toLowerCase().includes(q));

    return nameMatch || itemMatch;
  });
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here

  if (typeof customerName !== "string" || !customerName.trim()) return "";
  if (!Array.isArray(thalis) || thalis.length === 0) return "";

  const lines = thalis.map((t) => `- ${t.name} x Rs.${Number(t.price).toFixed(2)}`).join("\n");

  const total = thalis.reduce((sum, t) => {
    const p = t?.price;
    return sum + (typeof p === "number" && Number.isFinite(p) ? p : 0);
  }, 0);

  return `THALI RECEIPT
---
Customer: ${customerName.toUpperCase()}
${lines}
---
Total: Rs.${total.toFixed(2)}
Items: ${thalis.length}`;
}
