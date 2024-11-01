import { toE164 } from './e164';

describe('toE164', () => {
  it('should correctly return inputed E.164 format US-based phone number with no change', () => {
    const phoneNumber = '+15559395815';
    expect(toE164(phoneNumber)).toEqual(phoneNumber);
  });

  it('should correctly convert US-based phone number with no country code to E.164 format (case 1)', () => {
    const phoneNumber = '5559395815';
    const expectedPhoneNumber = '+15559395815';
    expect(toE164(phoneNumber)).toEqual(expectedPhoneNumber);
  });

  it('should correctly convert US-based phone number with no country code to E.164 format (case 2)', () => {
    const phoneNumber = '3849183948';
    const expectedPhoneNumber = '+13849183948';
    expect(toE164(phoneNumber)).toEqual(expectedPhoneNumber);
  });

  it('should correctly convert US-based phone number with country code to E.164 format', () => {
    const phoneNumber = '15559395815';
    const expectedPhoneNumber = '+15559395815';
    expect(toE164(phoneNumber)).toEqual(expectedPhoneNumber);
  });

  it('should correctly convert a US-based phone number with spaces to E.164 format', () => {
    const phoneNumber = '555 939 5815';
    const expectedPhoneNumber = '+15559395815';
    expect(toE164(phoneNumber)).toEqual(expectedPhoneNumber);
  });

  it('should correctly convert a US-based phone number with brackets and spaces to E.164 format', () => {
    const phoneNumber = '(555) 939 5815';
    const expectedPhoneNumber = '+15559395815';
    expect(toE164(phoneNumber)).toEqual(expectedPhoneNumber);
  });

  it('should correctly convert a US-based phone number with brackets, spaces, and dashes to E.164 format', () => {
    const phoneNumber = '(555) 939-5815';
    const expectedPhoneNumber = '+15559395815';
    expect(toE164(phoneNumber)).toEqual(expectedPhoneNumber);
  });
});
