import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";


type  AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }


    return (
        <div>


            <TextField
                error={!!error}
                id="outlined-basic"
                label={error}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={'small'}
            />


            <Button size="small"
                    variant="contained"
                    onClick={addItem}
                    style={{
                        background: 'purple',
                        maxWidth: '30px',
                        maxHeight: '30px',
                        minWidth: '30px',
                        minHeight: '30px'
                    }}
            >+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};
