import moment from "moment";
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
