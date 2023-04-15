import * as dayjs from 'dayjs'
dayjs().format()

export const formatDateDDMMYYYYHHMM = (date: Date) => { 
    const formattedDate = date.toISOString();
    return dayjs(formattedDate.toLocaleString()).format('DD/MM/YYYY HH:mm');
}

export const getDateBySecondsSinceEpoch = (date: Date) => {
    return date.getTime();
}