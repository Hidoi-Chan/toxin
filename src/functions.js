export function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100
    let n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

export function capitalizedString(str) {
    return str[0].toUpperCase() + str.slice(1)
}