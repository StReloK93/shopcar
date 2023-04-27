import { Sale, SummSale } from "@/interfaces/AgGridInterfaces"

export function getDevice() {
    var texa = navigator.userAgent.split(')')[0]
    var resatre = texa.split('(')[1]

    var result = resatre.replace(/Linux|;|OS|Mac|like|X|en-us|U|CPU|13_2_3|13_3|64/ig, '').trim().split('Bild')[0]

    if (/iPhone/i.test(result)) return Array.from(new Set(result.split(' '))).toString().replace(/,/ig, '')
    else return result

}


export function saleSummed(Sales: Sale[]): SummSale{
    const SummSale: SummSale = {
        cash: 0,
        electron: 0,
        debt: 0,
    }
    Sales.forEach(sale => {
        SummSale.cash = +SummSale.cash + +sale.cash
        SummSale.electron = +SummSale.electron + +sale.electron
        SummSale.debt = +SummSale.debt + +sale.debt
    });
    return SummSale
}