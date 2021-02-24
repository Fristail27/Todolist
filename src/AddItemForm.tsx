import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void;
    disabled?: boolean
}

const AddItemForm = React.memo((props: AddItemFormPropsType) =>{
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError("Title is required!");
        }
        setTitle("")
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    };
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onKeyPress={onKeyPressHandler}
                label={"Ttile"}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton
                color={"primary"}
                onClick={addItem}
                disabled={props.disabled}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})

export default AddItemForm;