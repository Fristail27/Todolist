import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    id: string
    todolistID:string
    isDone: boolean
    title: string
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
}

const Task = React.memo((props:TaskPropsType) => {
    const {id, todolistID, isDone, title, changeStatus: changeStatusT, changeTaskTitle:changeTaskTitleT, removeTask:removeTaskT} = props
    const removeTask = () => {
        removeTaskT(id, todolistID)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        changeStatusT(id, e.currentTarget.checked, todolistID)
    }
    const changeTaskTitle = useCallback ((title: string) => {
        changeTaskTitleT(id, title, todolistID)
    }, [changeTaskTitleT, id, todolistID])
    return (
        <li className={isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={changeStatus}
                checked={isDone}
            />
            <EditableSpan getNewTitle={changeTaskTitle} value={title}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>

        </li>
    )


})

export default Task