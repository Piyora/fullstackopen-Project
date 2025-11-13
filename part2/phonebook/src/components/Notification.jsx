const Notification = ({message}) => {
    if (message === null) {
    return null
    }

    return (
    <div className={message.class}>
        {message.message}
    </div>
    )
}
  
export default Notification