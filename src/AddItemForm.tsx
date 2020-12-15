import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void;
}

function AddItemForm (props:AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string|null>(null)

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError ("Title is required!");
        }
        setTitle("")
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === "Enter") addItem()};
    return (
        <div>
            <input
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export default AddItemForm;