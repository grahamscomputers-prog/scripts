let e = entry(); // Always start with entry()
let engine = e.field("Send Quote"); // SMS or Email
let output = null;
// Customer name (prevents undefined)
let name = e.field("name") || "";
// Formatting lines
let line  = "\n" + "*".repeat(30);
let line1 = "\n" + "-".repeat(20);
let line2 = "-".repeat(13);
let space = "\n" + " ".repeat(13);
// Formatting Parts
let total = 5; // increase if more than 5 parts showing
let parts = [];
for (let i = 1; i <= total; i++) {
  if (e.field("part " + i + " sell")) {
    parts.push(e.field("part " + i) + "  -  " + e.field("part " + i + " sell"));
  }
}
// -----------------------------------------
// Build common body once
// -----------------------------------------

function buildQuoteBody() {
  return (
    (engine === "SMS Quote" || "Email Quote" ? "Hi " + name +"," +  "\n\n" : "") +

    "Please find quote as requested\n" +
    space + line2 +
    space + "Quote #: " + (e.field("quote #") || "N/A") +
    space + line2 + "\n" +
    "This quote is valid for " + (e.field("valid days") || 0) + " days.\n\n" +
    "From: " + moment(e.field("quote date") || new Date()).format('D MMM YYYY') + "   " +
    "To: " + moment(e.field("quote date") || new Date()).add(e.field("valid days") || 0, 'days').format('D MMM YYYY') + "\n" +
    line + space + (e.field("quote type") || "Quote") + " Details" + line + "\n" +
    (parts.length ? parts.join("\n") : "No parts specified") + "\n" +
    line1 + "\n" +
    "Subtotal:   $" + parseFloat(e.field("subtotal*") || 0).toFixed(2) + "\n" +
    "Shipping:   $" + parseFloat(e.field("shipping*") || 0).toFixed(2) + "\n" +
    "Labour:     $" + parseFloat(e.field("labour*") || 0).toFixed(2) + "\n" +
    "Total:      " + (e.field("gt*") || "N/A") +
    line1 + "\n" +
    (e.field("repair message") || "") + "\n" +
    (e.field("upgrade message") || "") + "\n\n" +
    (e.field("signature") || "")
  );
}
// -----------------------------------------
// Final output depending on mode
// -----------------------------------------
let body = buildQuoteBody();
if (engine === "SMS Quote" && e.field("mobile")) {
  let encodedBody = encodeURIComponent(body);
  let smsUrl = "sms:" + e.field("mobile") + "?body=" + encodedBody;
  output = "📱 " + '<a href="' + smsUrl + '" class="button"> SMS</a>';
}
if (engine === "Email Quote" && e.field("email")) {
  let subject = (e.field("quote type") || "Desktop") + " Quote as Requested";
  let encodedSubject = encodeURIComponent(subject);
  let encodedBody = encodeURIComponent(body);
  let mailtoUrl = "mailto:" + e.field("email") + "?subject=" + encodedSubject + "&body=" + encodedBody;
  output = "✉️ " + '<a href="' + mailtoUrl + '" class="button"> Email</a>';
}
// Return output
output;