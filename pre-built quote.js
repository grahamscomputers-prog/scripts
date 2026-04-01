let e = entry(); // Always start with entry()

let engine = e.field("Send Quote"); // SMS or Email
let output = null;

// Customer name (prevents undefined)
let name = e.field("name") || "";

// Formatting lines
let line  = "\n" + "*".repeat(30);
let line1 = "\n" + "-".repeat(20);
let line2 = "-".repeat(13);
let space = "\n" + " ".repeat(18);

// -----------------------------------------
// Build common body once
// -----------------------------------------
function buildQuoteBody() {
  return (
    (engine === "SMS Quote" || "Email Quote" ? "Hi " + name +"," +  "\n\n" : "") +

/*
function buildQuoteBody() {
  return (
    (engine === "SMS Quote" ? "Hi " + name + "\n" : "") + // Greeting only for SMS
*/

    "Please find quote as requested\n" +
    space + line2 +
    space + "Quote #: " + (e.field("quote #") || "N/A") +
    space + line2 + "\n" +

    "This quote is valid for " + (e.field("valid days") || 0) + " days.\n" +
    "From: " +
      moment(e.field("quote date") || new Date()).format("D MMM YYYY") +
      " To: " +
      moment(e.field("quote date") || new Date())
        .add(e.field("valid days") || 0, "days")
        .format("D MMM YYYY") +
      "\n" +

    line +
    space + (e.field("type.") || "Product") + " DETAILS" +
    line + "\n" +

    "Brand: "          + (e.field("brand.")          || "Not specified") + "\n" +
    "CPU: "            + (e.field("cpu.")            || "Not specified") + "\n" +
    "Screen Size: "    + (e.field("screen.")         || "Not specified") + "\n" +
    "Ram: "            + (e.field("ram.")            || "Not specified") + "\n" +
    "HDD/SSD: "        + (e.field("hdd/ssd.")        || "Not specified") + "\n" +
    "Graphics Card: "  + (e.field("graphics card.")  || "Not specified") + "\n" +
    "Wifi: "           + (e.field("wifi.")           || "Not specified") + "\n" +
    "OS: "             + (e.field("os version.")     || "Not specified") + "\n" +

    line1 + "\n" +
    "Subtotal: $" + parseFloat(e.field("subtotal.") || 0).toFixed(2) + "\n" +
    "Shipping: $" + parseFloat(e.field("shipping.") || 0).toFixed(2) + "\n" +
    "Labour: $"   + parseFloat(e.field("labour.")   || 0).toFixed(2) + "\n" +
    "Extras: $"   + parseFloat(e.field("extras.")   || 0).toFixed(2) + "\n" +
    "Total: "     + (e.field("gt.") || "Not specified") +
    line1 + "\n" +

    (
      e.field("Office") || e.field("printer") || e.field("other")
        ? (
            line +
            space + "OPTIONAL EXTRAS" +
            line + "\n" +

            (e.field("Office")
              ? "Microsoft Office:\n" +
                e.field("Office") + " $" +
                parseFloat(e.field("office sell price") || 0).toFixed(2) + "\n"
              : "") +

            (e.field("printer")
              ? "Printer:\n" +
                e.field("printer") + " $" +
                parseFloat(e.field("printer sell price") || 0).toFixed(2) + "\n"
              : "") +

            (e.field("other")
              ? "Other:\n" +
                e.field("other") + " $" +
                parseFloat(e.field("other sell price") || 0).toFixed(2) + "\n"
              : "")
          )
        : ""
    ) +
"\n\n" +
    (e.field("pre built message") || "Thank you for your inquiry.") + "\n" +
    (e.field("signature"))|| "");
  
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
  let subject        = (e.field("Quote Type") || " ") + " Quote as Requested";
  let encodedSubject = encodeURIComponent(subject);
  let encodedBody    = encodeURIComponent(body);
  let mailtoUrl      = "mailto:" + e.field("email") +
                       "?subject=" + encodedSubject +
                       "&body=" + encodedBody;

  output = "✉️ " + '<a href="' + mailtoUrl + '" class="button"> Email</a>';
}

// Return output
output;