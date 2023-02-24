import React, { FC, useMemo } from 'react';
import Link from 'next/link';
import { Note, OrderDirection } from 'types';
import NoteItem from 'components/NoteItem';
import AddNoteButton from 'components/AddNoteButton';
import SearchBar from 'components/SearchBar';
import SortButton from 'components/SortButton';
import { useDiaryState } from 'providers';
import css from './HomeView.module.scss';

const HomeView: FC = () => {
  const {
    searchValue,
    addNote,
    deleteNote,
    setSearchValue,
    getFilteredNotes,
    sortByCreated,
    sortByUpdated,
  } = useDiaryState();

  const handleNoteDelete = (id: string) => () => {
    deleteNote(id);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredNotes = useMemo(() => getFilteredNotes(searchValue), [searchValue]);

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
          <Link href={note.id} key={note.id}>
            <NoteItem note={note} onNoteDelete={handleNoteDelete(note.id)} />
          </Link>
        ))}
      </div>
      <AddNoteButton onAddNote={addNote} />
    </div>
  );
};

export default HomeView;
