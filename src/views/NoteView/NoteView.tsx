/** @format */

import React, { FC, useMemo } from 'react';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import BackButton from 'components/BackButton';
import { useDiaryState } from 'providers';
import { getParsedData } from 'utils';
import css from './NoteView.module.scss';

const EditorBlock = dynamic(() => import('components/Editor'), {
  ssr: false,
});

const NoteView: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { notes, updateNote } = useDiaryState();

  const currentNote = useMemo(() => notes.find((note) => note.id === id), [id]);

  const currentNoteContent: OutputData = useMemo(
    () => (currentNote?.content ? getParsedData(currentNote?.content) : null),
    [currentNote?.content]
  );

  const handleNoteUpdate = (data: OutputData) => {
    updateNote(id as string, data);
  };

  return (
    <div className={css.homePage}>
      <BackButton />
      <section className={css.content}>
        <h2 className={css.date}>{currentNote?.createdAt}</h2>
        <EditorBlock
          data={currentNoteContent}
          onChange={handleNoteUpdate}
          holder="editorjs-container"
        />
      </section>
    </div>
  );
};

export default NoteView;
