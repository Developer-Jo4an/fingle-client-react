import moment from 'moment'

export const userId = new URL(window.location.href).pathname !== '/' ? new URL(window.location.href).pathname : '/6511a3840f9e98d5baa854eb'

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

export const dateObj = date => {
    return {
        'Today': [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)].map(date => new Date(date)),
        'Week': [moment(new Date().setHours(0, 0, 0, 0)).subtract(6, 'days')._d, new Date(new Date().setHours(23, 59, 59, 999))],
        'Month': [moment(new Date().setHours(0, 0, 0, 0)).subtract(30, 'days')._d, new Date(new Date().setHours(23, 59, 59, 999))],
        'Year': [moment(new Date().setHours(0, 0, 0, 0)).subtract(1, 'years')._d, new Date(new Date().setHours(23, 59, 59, 999))],
        'All time': [moment(new Date().setHours(0, 0, 0, 0)).subtract(50, 'years')._d, new Date(new Date().setHours(23, 59, 59, 999))],
    }[date]
}

export function dateRefactor(date) {
    date = new Date(date);const options = {day: 'numeric', month: 'short', weekday: 'short'};date = date.toLocaleDateString('en-US', options)

    const [weekday, monthDay] = date.split(', ')
    const [month, day] = monthDay.split(' ')

    return `${day} ${month}, ${weekday}`
}

export function timeRefactor(date) {
    date = new Date(date)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`
}

export function chunkTransactions (arr) {
    const transactionChunks = {}
    arr.toReversed().forEach(tr => {
        const date = dateRefactor(tr.date)
        if (transactionChunks.hasOwnProperty(date)) transactionChunks[date] = [...transactionChunks[date], tr]
        else transactionChunks[date] = [tr]
    })
    return transactionChunks
}

export function reloadSlider(ref) {
    ref.current.setAttribute('ref', ref)
    ref.current.setAttribute('slides-per-view', 'auto')
    ref.current.setAttribute('free-mode', 'true')
    ref.current.setAttribute('space-between', '10')
    ref.current.setAttribute('freeModeMomentumRatio', '0')
}

export function formattedPeriod(period) {
    let periodJson = dateObj(period)
    if (!periodJson) {
        if (period.includes(' - ')) {
            periodJson = period.split(' - ').map((item, index) => {
                const date = moment(item, 'DD.MM.YYYY')._d
                return index === 1 ? date.setHours(23, 59, 59, 999) : date
            })
        } else periodJson = [moment(period, 'DD.MM.YYYY')._d,
            moment(period, 'DD.MM.YYYY')._d.setHours(23, 59, 59, 999)]
    }
    return periodJson
}

// proto

Number.prototype.getPercent = function (sum) { return ((this * 100) / sum).toFixed() }
Date.prototype.getWeekDay = function () { return this.toLocaleDateString('en-US', { weekday:  'short' }) }