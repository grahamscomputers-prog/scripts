let e = entry();
let line = "-".repeat(50) + "\n";
let space = " ".repeat(14);
let lib = libByName('ACCOMMODATION');
let link_0 = lib.linksTo(e);
let link = [];
let msg = [];
const travellers = obj => {
    if (obj) {
        let list = [obj.fullName];
        while (obj.hasNext) {
            obj = obj.next;
            list.push(obj.fullName);
        }
        return list.join(', ');
    } else {
        return '';
    }
};
const sortByDate = (a, b) => {
    return a.field('Checkin') - b.field('Checkin');
};
const getStars = rating => '⭐'.repeat(rating);
let additionalLib = libByName('ACCOMMODATION');
let additionalLink = additionalLib.linksTo(e);
if (link_0[0] !== null) {
    for (let i in link_0) {
        link.push(link_0[i]);
    }
    link.sort(sortByDate);
    for (let i in link) {
        let txt = "(" + (parseInt(i) + 1) + ") " + link[i].title + "\n" +
            "     " + getStars(link[i].field('rating')) + "\n" +
            "     " + link[i].description + "\n" +
            "     " + link[i].field('property location');
        msg.push(txt);
    }
}
let paidTravellerList = travellers(e.field('Paid Travellers list'));
let otherTravellerList = travellers(e.field('Other Travellers list'));
let travellerText = paidTravellerList;
if (paidTravellerList && otherTravellerList) {
    travellerText += ", ";
}
travellerText += otherTravellerList;
let formatDateTime = (date, format) => date ? moment(date).format(format) : ' ';
// Sort linked accommodations by check-in date (ascending)
link.sort(sortByDate);
// Ensure we access the first entry in the sorted list
let firstCheckinDate = link.length > 0 && link[0].field('Checkin') 
    ? moment(link[0].field('Checkin')).format('ddd D MMM YYYY') 
    : 'N/A'; // Default to 'N/A' if no valid entry exists
// Fetch the 'property location' of the first sorted entry
let firstPropertyLocation = link.length > 0 && link[0].field('property location') 
    ? link[0].field('property location') 
    : 'N/A';
// Fetch the 'Check-in date' and 'property location' of the second sorted entry
let secondCheckinDate = link.length > 1 && link[1].field('Checkin') 
    ? moment(link[1].field('Checkin')).format('ddd D MMM YYYY') 
    : 'N/A';
let secondPropertyLocation = link.length > 1 && link[1].field('property location') 
    ? link[1].field('property location') 
    : 'N/A';
let txt = "This is the itinerary for the following travellers:\n\n" + travellerText + "\n\n";
txt += line;
txt += "🌐 DESTINATION" + "\n";
txt += line;
txt += "Destination:  " + e.field("destination") + "\n";
// Use the second property's Check-in date and location for the Start Date
txt += "From:             " + firstCheckinDate + " - " + firstPropertyLocation + "\n";
txt += "                       " + secondCheckinDate + " - " + e.field("destination name") + "\n";
txt += "To:                  " + moment(e.field("to date")).format('ddd D MMM YYYY') + " - " + e.field("destination name")+ "\n\n";
txt += "Home:            "  + e.field("home1") + "\n\n";
txt += line;
txt +=  "✈️  DOMESTIC FLIGHTS"+ "\n"
txt += line
txt += "\n"
txt += "🟢  DEPARTURE FLIGHT" + "\n"
txt += "\n"
txt += "Depart:    " + formatDateTime(e.field("depart dom date"),'D MMM YYYY') + " - "+e.field("depart dom time")+ "\n"
txt += "Airport:    " + e.field("depart dom airport") + "\n"
txt += "Airline:     " + e.field("depart dom airline") + "\n"
txt += "Flight #:   " + e.field("depart dom flight") + "\n"
txt += "Arrive:      " + formatDateTime(e.field("arrival dom date"), 'D MMM YYYY') + " - " + e.field("arrival dom time") + "\n"
txt += "Airport:    " + e.field("arrival dom airport") + "\n"
txt += "\n"
txt += "🔴 RETURN FLIGHT" + "\n"
txt += "\n"
txt += "Return:    " + formatDateTime(e.field("return dom date"), 'D MMM YYYY') + " - " + e.field("return dom time")+"\n"
txt += "Airport:    " + e.field("return dom airport") + "\n"
txt += "Airline:     " + e.field("return dom airline") + "\n"
txt += "Flight #:   " + e.field("return dom flight") + "\n"
txt += "Arrive:      " + formatDateTime(e.field("arrive dom date"), 'D MMM YYYY') + " - " + e.field("arrive dom time") +"\n"
// txt += "\n"
txt += "Airport:    " + e.field("arrive dom airport") + "\n"
txt += "\n"
txt +=  line
txt += "✈️  INTERNATIONAL FLIGHTS" + "\n"
txt +=  line
txt += "\n"
txt += "🟢  DEPARTURE - FLIGHT" + "\n"
txt += "\n"
txt += "Depart:    " + formatDateTime(e.field("depart int date"),'D MMM YYYY') + " - " + e.field("depart int time")+ "\n"
txt += "Airport:    " + e.field("depart int airport") + "\n"
txt += "Airline:     " + e.field("depart int airline") + "\n"
txt += "Flight #:   " + e.field("depart int flight") + "\n"
txt += "Arrive:      " + formatDateTime(e.field("arrival int date"),'D MMM YYYY') + " - " + e.field("arrival int time")+ "\n"
txt += "Airport:    " + e.field("arrival int airport") + "\n"
txt += "\n"
txt += "🔴  RETURN - FLIGHT" + "\n"
txt += "\n"
txt += "Return:    " + formatDateTime(e.field("return int date"),'D MMM YYYY') + " - " + e.field("return int time")+"\n"
txt += "Airport:    " + e.field("return int airport") + "\n"
txt += "Airline:     " + e.field("return int airline") + "\n"
txt += "Flight #:   " + e.field("return int flight") + "\n"
txt += "Arrive:      " + formatDateTime(e.field("arrive int date"),'D MMM YYYY') + " - " + e.field("arrive int time")+ "\n"
txt += "Airport:    " + e.field("arrive int airport") + "\n"
txt += "\n"
txt += line
txt +="🏠  ACCOMMODATION" + "\n"
txt += line
txt += "\n"
txt +=  msg.join('\n\n')   + "\n"
txt += "\n"
AndroidMessages.email((" "), (e.field("destination"))+ "  Itinerary" ,txt);
