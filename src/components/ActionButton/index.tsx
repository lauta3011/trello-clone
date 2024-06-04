import React from "react";

import { faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IActionButton {
    isDelete: boolean,
    handleAction: () => void,
}

const ActionButton: React.FC<IActionButton> = ({ isDelete, handleAction }) => {
    return (
        <div className={`rounded-full ml-2 h-6 w-6 flex justify-center align-bottom opacity-50 ${isDelete ? "bg-red-300" : "bg-green-500"} transition ease-in-out delay-100 hover:opacity-100`}>
            {isDelete && <FontAwesomeIcon onClick={() => handleAction() } className="h-full size-3" icon={faTrashCan}/>}
            {!isDelete && <FontAwesomeIcon onClick={() => handleAction() } className="h-full size-3" icon={faCheck}/>}
        </div>
    )
}

export default ActionButton;