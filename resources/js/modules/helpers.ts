export function getDevice() {
    var texa = navigator.userAgent.split(')')[0]
    var resatre = texa.split('(')[1]

    var result = resatre.replace(/Linux|;|OS|Mac|like|X|en-us|U|CPU|13_2_3|13_3|64/ig, '').trim().split('Bild')[0]

    if (/iPhone/i.test(result)) return Array.from(new Set(result.split(' '))).toString().replace(/,/ig, '')
    else return result

}