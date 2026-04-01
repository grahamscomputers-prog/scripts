let e = entry();
let engine = e.field("Send Warranty");
let output = null;

// -------------------------
// Formatting lines
// -------------------------
let line  = "-".repeat(40);
let line1 = "=".repeat(30);

// -------------------------
// SAFE DATE FORMATS
// -------------------------
let invoiceDate = e.field("Invoice Date")
  ? moment(e.field("Invoice Date")).format("DD MMM YYYY")
  : "";

let warrantyExpDate = e.field("Warranty EXP")
  ? moment(e.field("Warranty EXP")).format("DD MMM YYYY")
  : "";

// -------------------------
// WARRANTY LOGIC
// -------------------------
let duration = e.field("Duration");
let years = e.field("Years") || "";
let warrantyText = "";

if (duration === "Custom Date") {

  warrantyText =
    "Warranty Expires: " + warrantyExpDate;

} else if (duration === "Lifetime") {

  warrantyText =
    "Warranty Expires: Product lifetime warranty";

} else { // Years

  let yearLabel = years == 1 ? "year" : "years";

  warrantyText =
    "Warranty: " + years + " " + yearLabel + "\n" +
    "Warranty Expires: " + warrantyExpDate;
}

// -------------------------
// SHARED MESSAGE BODY
// -------------------------
let body =
  "Hi " + e.field("Customer Name") +"," + "\n\n" +
  (e.field("message") || "") + "\n\n" +
  line1 + "\n" +
  "   👥 CUSTOMER WARRANTY DETAILS\n" +
  line1 + "\n\n" +
  "Device: " + (e.field("Device Type") || "") + "\n" +
  "Brand: " + (e.field("Device Brand") || "") +"\n" +
  "Model: " + (e.field("Device Model") || "") + "\n" +
/*  "Serial Number: " + (e.field("Serial Number") || "") + "\n" +
"SNID: " + (e.field("SNID") || "") + "\n" +
*/
"Serial Number: " + (e.field("Serial Number") || "") + "\n" +
(
  e.field("Device Brand") === "Acer"
    ? "SNID: " + (e.field("SNID") || "") + "\n"
    : ""
) +
  "Invoice Date: " + invoiceDate + "\n" +
  "Invoice Number: " + (e.field("Customer Invoice") || "") + "\n" +
  warrantyText + "\n" +
  line;

// -------------------------
// EMAIL MODE
// -------------------------
if (engine === "Yes") {

  let email = e.field("customer email");

  if (email) {
    let subject =
      (e.field("Device Type") || "") + " Warranty Card";

    let mailtoUrl =
      "mailto:" + email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    output =
      "✉️ <a href=\"" + mailtoUrl + "\" class=\"button\">Send</a>";
  }
}

// -------------------------
// FINAL OUTPUT
// -------------------------
output;
