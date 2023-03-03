export const IsYear = (str:string):boolean => {
    const regexp = new RegExp(/^(19|20)\d{2}$/)
    return regexp.test(str);
}