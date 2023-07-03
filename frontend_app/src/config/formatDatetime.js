import React from 'react'

export const formatDatetime = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).split('/').join('_');
    return formattedDate
}