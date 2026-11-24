const format = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

export const rupees = amount => format.format(amount)
