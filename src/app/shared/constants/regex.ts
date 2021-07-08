export const EMAIL = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
export const NUMBER = /(^\d+$)/;
export const FLOAT = /(^\d{2,15}\.\d{2}$)/;
export const CURRENCY = /(^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9][0-9])?$)/;
export const PERCENTAGE = /^(0*100{1,1}\.?((\.)0*)?%?$)|(^0*\d{0,2}\.?((\.)\d*)?%?)$/;
export const RFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
export const TIME = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
