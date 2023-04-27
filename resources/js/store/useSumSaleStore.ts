import { defineStore } from "pinia"
import { ref, Ref } from "vue"
import moment from '@/modules/moment'
import { saleSummed } from '@/modules/helpers'
import { SummSale } from "@/interfaces/AgGridInterfaces"
export const sumSale = defineStore('sumSale', () => {
    const Summa: Ref<SummSale> = ref({
        cash: null,
        electron: null,
        debt: null,
    })
    function getDayInfo() {
        axios.post('/sale/dayinfo', {
            from: moment().format(moment.HTML5_FMT.DATE),
            to: moment().add(1, 'days').format(moment.HTML5_FMT.DATE)
        }).then(({ data }) => {
            Summa.value = saleSummed(data)
        })
    }

    return { Summa, getDayInfo }
})