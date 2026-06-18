import React from "react";

const Message = (props) => {
    const msg = props.message
  return (
    <>
      <div className="notify-container">
        <span className="notify-msg">
        {msg}
        </span>
      </div>
    </>
  );
};

export default Message;