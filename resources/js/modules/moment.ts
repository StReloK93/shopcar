import moment from 'moment'
moment.locale('uz', {
    relativeTime: {
        future: '%s keyin',
        past: '%s oldin',
        s: '1 sekund',
        m: '1 minut',
        mm: '%d minut',
        h: '1 soat',
        hh: '%d soat',
        d: '1 kun',
        dd: '%d kun',
        M: '1 Oy',
        MM: '%d Oy',
    }
})

export default moment