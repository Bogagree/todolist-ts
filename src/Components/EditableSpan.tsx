import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const doubleClickHandler = () => {
        setEditMode(!editMode)
    }

    function activateViewMode() {
        setEditMode(!editMode)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return editMode
        ? <input value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler}
                 onKeyDown={onKeyDownHandler}/>
        : <span onDoubleClick={doubleClickHandler}>{props.title}</span>
};
