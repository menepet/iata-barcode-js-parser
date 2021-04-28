let security_var = -1;

const iataFormat = {
		// Mandatory
		BEGINNING_OF_MANDATORY_FIELDS: { length: 0, offset: 0, content: "Mandatory Fieds", explanation: "Mandatory Fieds"},
		FORMAT_CODE: { length: 1, offset: 1, content: "S|M", explanation: "Format Code"},
		NUMBER_OF_SEGMENTS: { length: 1, offset: 2, content: "[1-4]", explanation: "Number of Legs Encoded"},
		PASSENGER_NAME: { length: 20, offset: 22, content: "", explanation: "Passenger Name"},
		ELECTRONIC_TICKET_INDICATOR: { length: 1, offset: 23, content: "E", explanation: "Electronic Ticket Indicator"},
		OPERATING_CARRIER_PNR_CODE: { length: 7, offset: 30, content: "", explanation: "Operating Carrier PNR Code"},
		FROM_CITY_AIRPORT_CODE: { length: 3, offset: 33, content: "", explanation: "From City Airport Code"},
		TO_CITY_AIRPORT_CODE: { length: 3, offset: 36, content: "", explanation: "To City Airport Code"},
		OPERATING_CARRIER_DESIGNATOR: { length: 3, offset: 39, content: "", explanation: "Operating carrier Designator"},
		FLIGHT_NUMBER: { length: 5, offset: 44, content: "", explanation: "Flight Number"},
		DATE_OF_FLIGHT: { length: 3, offset: 47, content: "[0-9]{3}", explanation: "Date of Flight (Julian Date)"},
		COMPARTMENT_CODE: { length: 1, offset: 48, content: "[A-Z]", explanation: "Compartment Code"},
		SEAT_NUMBER: { length: 4, offset: 52, content: "", explanation: "Seat Number"},
		CHECK_IN_SEQUENCE_NUMBER: { length: 5, offset: 57, content: "", explanation: "Check-in Sequence Number"},
		PASSENGER_STATUS: { length: 1, offset: 58, content: "[0-9A-Z]", explanation: "Passenger Status"},
		CONDITIONALS_SIZE: { length: 2, offset: 60, content: "[0-F]{2}", explanation: "Field size of variable field (Conditional + Airline item 4)"},
		// Conditional
		BEGINNING_OF_VERSION_NUMBER: { length: 1, offset: 61, content: "GREATER_THAN", explanation: "Beginning of version number"},
		VERSION_NUMBER: { length: 1, offset: 62, content: "[1-5]", explanation: "Version number"},
		UNIQUE_CONDITIONALS_SIZE: { length: 2, offset: 64, content: "[0-F]{2}", explanation: "Field size of following structured message - unique"},
		PASSENGER_DESCRIPTION: { length: 1, offset: 65, content: "[0-9A-Z\\s]", explanation: "Passenger Description"},
		SOURCE_OF_CHECK_IN: { length: 1, offset: 66, content: "[WKRMOTV\\s]", explanation: "Source of check-in"},
		SOURCE_OF_BOARDING_PASS_ISSUANCE: { length: 1, offset: 67, content: "[WKXRMOTV\\s]", explanation: "Source of Boarding Pass Issuance"},
		DATE_OF_PASS_ISSUANCE: { length: 4, offset: 71, content: "[0-9]{4}", explanation: "Date of Issue of Boarding Pass (Julian Date)"},
		DOCUMENT_TYPE: { length: 1, offset: 72, content: "B|I", explanation: "Document Type"},
		AIRLINE_DESIGNATOR_OF_ISSUER: { length: 3, offset: 75, content: "", explanation: "Airline Designator of boarding pass issuer"},
		BAGGAGE_TAG_LICENSE_PLATE: { length: 13, offset: 88, content: "", explanation: "Baggage Tag License Plate Number (s)"},
		FIRST_BAGGAGE_TAG_LICENSE_PLATE: { length: 13, offset: 101, content: "", explanation: "1st Non-Consecutive Baggage Tag License Plate Number"},
		SECOND_BAGGAGE_TAG_LICENSE_PLATE: { length: 13, offset: 114, content: "", explanation: "2nd Non-Consecutive Baggage Tag License Plate Number"},
		REPEATED_CONDITIONALS_SIZE: { length: 2, offset: 116, content: "[0-F]{2}", explanation: "Field size of following structured message - repeated"},
		AIRLINE_NUMERIC_CODE: { length: 3, offset: 119, content: "[0-9]{3}", explanation: "Airline Numeric Code"},
		SERIAL_NUMBER: { length: 10, offset: 129, content: "", explanation: "Document Form/Serial Number"},
		SELECTEE_INDICATOR: { length: 1, offset: 130, content: "[\\s0-1]", explanation: "Selectee Indicator"},
		INTERNATIONAL_DOCUMENT_VERIFICATION: { length: 1, offset: 131, content: "[\\s0-2]", explanation: "International Document Verification"},
		MARKETING_CARRIER_DESIGNATOR: { length: 3, offset: 134, content: "", explanation: "Marketing Carrier Designator"},
		FREQUENT_FLYER_AIRLINE_DESIGNATOR: { length: 3, offset: 137, content: "", explanation: "Frequent Flyer Airline Designator"},
		FREQUENT_FLYER_NUMBER: { length: 16, offset: 153, content: "", explanation: "Frequent Flyer Number"},
		ID_AD_INDICATOR: { length: 1, offset: 154, content: "", explanation: "ID/AD Indicator"},
		FREE_BAGGAGE_ALLOWANCE: { length: 3, offset: 157, content: "", explanation: "Free Baggage Allowance"},
		FAST_TRACK: { length: 1, offset: 158, content: "[YN\\s]", explanation: "Fast Track"},
		FOR_AIRLINE_USE: { length: security_var, offset: 158 + security_var, content: "", explanation: "For individual airline use"},
		// Security
		BEGINNING_OF_SECURITY_DATA: { length: 1, offset: 159 + security_var, content: "CARET_OR_GREATER_THAN", explanation: "Beginning of security data"},
		TYPE_OF_SECURITY_DATA: { length: 1, offset: 160 + security_var, content: "", explanation: "Type of Security Data"},
		LENGTH_OF_SECURITY_DATA: { length: 2, offset: 162 + security_var, content: "[0-F]{2}", explanation: "Length of Security Data"},
		SECURITY_DATA: { length: 100, offset: 262 + security_var, content: "", explanation: "Security Data"}
	};

/**
 * OnClick triggered function for iata input,
 * which MUST NOT contains spaces inside barcode
 * @param {Boolean} isFromIndex
 * @param {String} barcode
 * @returns
 */
export const getIataData = (barcode) => {
	let data = [];

	for (const key in iataFormat) {
		const iataFormatObject = iataFormat[key];
		const element = getEachValue(barcode, iataFormatObject);

		if(key === 'BEGINNING_OF_MANDATORY_FIELDS') data.push({ key: 'Mandatory Fieds', isTitle: true });
		else if(key === 'BEGINNING_OF_VERSION_NUMBER') data.push({ key: 'Conditional Fieds', isTitle: true });
		else if(key === 'BEGINNING_OF_SECURITY_DATA') data.push({ key: 'Security Fieds', isTitle: true });
		else data.push({ key: iataFormatObject.explanation, value: element });
	};

	return data
}

/**
 *	Get the value of the parsed iata barcode you want.
 * @param {String} input
 * @param {Object} iataFormatObj
 * @returns
 */
 function getEachValue(input, iataFormatObj) {
	if (iataFormatObj.offset <= input.length && input.length <= 158/*because of airline's var field, see below*/) {
		let tmp = input.substring(iataFormatObj.offset - iataFormatObj.length, iataFormatObj.offset);
		return tmp.trim().length === 0 ? '(empty field)': tmp;
	}
	return -1;
}
