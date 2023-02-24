export const IsLicence = (str:string):boolean => {
    const regexp = new RegExp(/^\d{2}\s[АВЕКМНОРСТУХ]{2}\s\d{6}$/);
    return regexp.test(str);
}