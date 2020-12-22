import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string,
    getNewTitle: (title: string) => void,
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.getNewTitle(title.trim())
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") offEditMode()
    }
    return (
        editMode
            ? <TextField
                // variant={"outlined"}
                value={title}
                onBlur={offEditMode}
                autoFocus={true}
                onChange={onChangeHandler}
            />
            // <input
            //     value={title}
            //     onBlur={offEditMode}
            //     autoFocus={true}
            //     onChange={onChangeHandler}
            //     onKeyPress={onKeyPressEnter}
            // />
            : <span onDoubleClick={onEditMode}>{props.value}</span>
    )
}

export default EditableSpan