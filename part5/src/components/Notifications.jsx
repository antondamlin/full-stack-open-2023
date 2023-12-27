const Notification = ({ message, classVal }) => {
  if (message === null) {
    return null
  }

  return (
    <>
      <div className={classVal}>{message}</div>
    </>
  )
}

export default Notification
