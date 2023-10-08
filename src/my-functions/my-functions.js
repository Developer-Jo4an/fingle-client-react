import moment from 'moment'

export const userId = new URL(window.location.href).pathname
export const errorUser = {
    allCards:[{}, {}],
    avatar: 'error',
    contributions:[],
    debts: [],
    email: "error",
    investments: [],
    nickname: "error",
    password: "error",
    purposes: [],
    transactionCategories: {expense: {}, income: {}},
    transactions: [],
    _id: "23423423423423423"
}

export const dateObj = (date) => {
    return {
        'Today': [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)].map(date => new Date(date)),
        'Week': [moment(new Date().setHours(0, 0, 0, 0)).subtract(6, 'days')._d, new Date(new Date().setHours(23, 59, 59, 999))],
        'Month': [moment(new Date().setHours(0, 0, 0, 0)).subtract(30, 'days')._d, new Date(new Date().setHours(23, 59, 59, 999))],
        'Year': [moment(new Date().setHours(0, 0, 0, 0)).subtract(1, 'years')._d, new Date(new Date().setHours(23, 59, 59, 999))],
        'All time': [moment(new Date().setHours(0, 0, 0, 0)).subtract(50, 'years')._d, new Date(new Date().setHours(23, 59, 59, 999))],
    }[date]
}

export function dateRefactor(date) {
    date = new Date(date)
    const options = {day: 'numeric', month: 'short', weekday: 'short'}
    date = date.toLocaleDateString('en-US', options)

    const [weekday, monthDay] = date.split(', ')
    const [month, day] = monthDay.split(' ')

    return `${day} ${month}, ${weekday}`
}

export function timeRefactor(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`
}

export function formattedTransactions(transactionsData) {
    transactionsData = transactionsData.data.map(item =>
        new Object({...item, date: new Date(item.date)}))
        .sort((a, b) => b.date - a.date)

    const transactionsObj = {}
    transactionsData.forEach(item => {
        const date = dateRefactor(item.date)
        date in transactionsObj ?
            transactionsObj[date] = [...transactionsObj[date], item]
            : transactionsObj[date] = [item]
    })

    const lastTransactions = []
    for (const key in transactionsObj) lastTransactions.push([key, transactionsObj[key]])
    return lastTransactions
}

export function formattedInterval(interval) {
    const nowInterval = dateObj(interval)
    let formattedInterval = null
    if (nowInterval) return nowInterval
    else {
        if (interval.includes(' - ')) {
            formattedInterval = interval.split(' - ').map((date, i) => {
                const newDate = moment(date, 'DD.MM.YYYY')._d
                return i === 0 ? newDate : new Date(newDate.setHours(23, 59, 59, 999))
            })
        } else {
            const startDate = moment(interval, 'DD.MM.YYYY')._d
            const lastDate = new Date(moment(interval, 'DD.MM.YYYY')._d.setHours(23, 59, 59, 999))
            formattedInterval = [startDate, lastDate]
        }
        return formattedInterval
    }
}

export function reloadSlider(ref) {
    ref.current.setAttribute('ref', ref)
    ref.current.setAttribute('slides-per-view', 'auto')
    ref.current.setAttribute('free-mode', 'true')
    ref.current.setAttribute('space-between', '10')
    ref.current.setAttribute('freeModeMomentumRatio', '0')
}