import Plus from "icons/Plus";
import React, { FC } from "react";
import css from './AddNoteButton.module.scss';

type AddNoteButtonProps = {
  onAddNote: () => void;
};

const AddNoteButton: FC<AddNoteButtonProps> = ({
  onAddNote
}) => (
  <button onClick={onAddNote} type='button' className={css.button}>
    <Plus />
    <span className={css.buttonName}>new</span>
  </button>
)

export default AddNoteButton;
