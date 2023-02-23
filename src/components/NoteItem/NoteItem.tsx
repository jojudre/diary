import React, { FC, MouseEvent, useMemo } from 'react';
import { Note } from 'types';
import EditorParser from 'components/EditorParser';
import Close from 'icons/Close';
import css from './NoteItem.module.scss';

type NoteProps = {
  note: Note;
  onNoteDelete: () => void;
};

const NoteItem: FC<NoteProps> = ({ note, onNoteDelete }) => {
  const handleDeleteNote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onNoteDelete();
  };

  const editorData = useMemo(
    () => note.content && JSON.parse(note.content),
    [note.content]
  );

  return (
    <div className={css.note}>
      <button
        type="button"
        onClick={handleDeleteNote}
        className={css.deleteButton}
      >
        <Close />
      </button>
      <span className={css.title}>{note.createdAt}</span>
      {note.content && <EditorParser data={editorData} />}
    </div>
  );
};

export default NoteItem;
