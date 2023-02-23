import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { Note, OrderDirection } from 'types';
import NoteItem from 'components/NoteItem';
import AddNoteButton from 'components/AddNoteButton';
import { formatDate, searchInEditorText } from 'utils';
import SearchBar from 'components/SearchBar';
import SortButton from 'components/SortButton';
import { useDiaryState } from 'providers';
import css from './HomeView.module.scss';

const HomeView: FC = () => {
  const {
    notes,
    searchValue,
    addNote,
    deleteNote,
    setSearchValue,
    sortByCreated,
    sortByUpdated,
  } = useDiaryState();

  const handleNoteCreate = () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
    };
    addNote(newNote);
  };

  const handleNoteDelete = (id: string) => () => {
    deleteNote(id);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredNotes = useMemo(() => {
    if (searchValue === '') return notes;
    return notes.filter((note) => searchInEditorText(searchValue, note.content));
  }, [notes, searchValue]);

  const handleSortByCreated = (orderDirection: OrderDirection) => {
    sortByCreated(orderDirection);
  };

  const handleSortByUpdated = (orderDirection: OrderDirection) => {
    sortByUpdated(orderDirection);
  };

  return (
    <div className={css.homePage}>
      <div className={css.header}>
        <h1 className={css.appTitle}>&#10024; My Diary &#10024;</h1>
      </div>
      <div className={css.toolbar}>
        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          className={css.search}
        />
        <SortButton
          onSortByCreated={handleSortByCreated}
          onSortByUpdated={handleSortByUpdated}
        />
      </div>
      <div className={css.notes}>
        {filteredNotes.map((note: Note) => (
          <Link href={note.id} key={note.id} legacyBehavior passHref>
            <a href="replace">
              <NoteItem note={note} onNoteDelete={handleNoteDelete(note.id)} />
            </a>
          </Link>
        ))}
      </div>
      <AddNoteButton onAddNote={handleNoteCreate} />
    </div>
  );
};

export default HomeView;
