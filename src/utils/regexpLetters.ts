export const IsLetters = (str:string):boolean => {
    const regexp = new RegExp(/^(?:[а-яА-Я]|\s)*$/);
    return regexp.test(str);
}