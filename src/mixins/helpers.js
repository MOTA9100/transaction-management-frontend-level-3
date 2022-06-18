export default {
    errorHandler (error) {
        const notification = { position: 'top left', type: 'error', text: '' }
        const { response: { data }} = error
        if ('errors' in data) {
            data.errors.forEach((text) => {
                notification.text = text
                this.$notify(notification)
            })
        } else {
            notification.text = 'Something went wrong!!!'
            this.$notify(notification)
        }
    }
}
