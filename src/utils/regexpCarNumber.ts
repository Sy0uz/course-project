export const IsRegNumber = (str:string):boolean => {
    const regexp = new RegExp(/^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}-\d{2}$/);
    return regexp.test(str);
}