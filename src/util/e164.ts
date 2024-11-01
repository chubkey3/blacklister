/**
 * Converts phone number string to E.164 format
 * Note: applies to US-based phone numbers only
 * @param {string} phoneNumber The phone number to be converted
 * @return {string} The result of converting phoneNumber to E.164
 */
export function toE164(phoneNumber: string) {
  // already in E.164 format
  if (phoneNumber.startsWith('+')) {
    return phoneNumber;
  }

  // parse phone number into just number (no spaces, dashes, or parenthesis)
  const phoneNumberRaw = phoneNumber.replaceAll(/[ \-\(\)\.]/g, '');

  // if no country code
  if (phoneNumberRaw.length == 10) {
    return `+1${phoneNumberRaw}`;
  } else {
    return `+${phoneNumberRaw}`;
  }
}

// test ASAP
