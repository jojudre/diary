import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { Note } from 'types';
import NoteItem from 'components/NoteItem';
import AddNoteButton from 'components/AddNoteButton';
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
    getFilteredNotes,
    sortNotes,
  } = useDiaryState();

  const handleNoteDelete = (id: string) => () => {
    deleteNote(id);
  };

  const handleAddNote = () => {
    addNote();
    setSearchValue('');
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredNotes = useMemo(
    () => getFilteredNotes(searchValue),
    [searchValue, notes]
  );

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
        <SortButton onSort={sortNotes} />
      </div>
      <div className={css.notes}>
        {filteredNotes.map((note: Note) => (
          <Link href={note.id} key={note.id}>
            <NoteItem note={note} onNoteDelete={handleNoteDelete(note.id)} />
          </Link>
        ))}
      </div>
      <AddNoteButton onAddNote={handleAddNote} />
    </div>
  );
};

export default HomeView;
