export const IsPassport = (str: string) => {
    const regexp = new RegExp(/\d{10}/);
    return regexp.test(str);
}