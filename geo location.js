/*if (field("address")) {
let abc = field("address").address;

let num = field("Num");

if (num > 0) {
  abc = abc.slice(0, - num);
}

abc;

} else {
  null;
}
*/
let addrField = field("address");
let abc = addrField ? (addrField.address || addrField) : "";

let unit = field("unit") || "";
let num = Number(field("Num")) || 0;

// Trim address if needed
if (abc && num > 0 && num < abc.length) {
  abc = abc.slice(0, -num).trim();
}

// Add unit in front (only if it exists)
if (unit) {
  abc = unit + " /" + " " + abc;
}

abc  || null;

