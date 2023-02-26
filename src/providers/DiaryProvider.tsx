import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Note, OrderBy, OrderDirection, SortOrder
} from 'types';
import {
  formatDate, loadState, saveState, searchInEditorText
} from 'utils';
import { OutputData } from '@editorjs/editorjs';

interface DiaryContextValue {
  notes: Note[];
  searchValue: string;
  sortBy: SortOrder;
  addNote: () => void;
  updateNote: (id: string, content: OutputData) => void;
  deleteNote: (id: string) => void;
  setSearchValue: (value: string) => void;
  sortNotes: (by: OrderBy, sortOrder: SortOrder) => void;
  getFilteredNotes: (value: string) => Note[];
}

const DiaryContext = createContext<DiaryContextValue>({
  notes: [],
  searchValue: '',
  sortBy: {
    [OrderBy.CREATED]: OrderDirection.DESC,
    [OrderBy.UPDATED]: OrderDirection.DESC,
  },
  sortNotes: () => {},
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  setSearchValue: () => {},
  getFilteredNotes: () => [],
});

const useDiaryState = () => useContext(DiaryContext);

const DiaryContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(loadState());
  }, []);

  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState({
    createdAt: OrderDirection.ASC,
    updatedAt: OrderDirection.ASC,
  });

  const addNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdAt: formatDate(new Date()),
      updatedAt: formatDate(new Date()),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    saveState(newNotes);
  };

  const updateNote = (id: string, content: OutputData) => {
    const newNotes = notes.map((note: Note) => (note.id === id
      ? {
        ...note,
        content: JSON.stringify(content),
        updatedAt: formatDate(new Date()),
      }
      : note));
    setNotes(newNotes);
    saveState(newNotes);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note: Note) => note.id !== id);
    setNotes(newNotes);
    saveState(newNotes);
  };

  const getFilteredNotes = (value: string) => {
    if (value === '') return notes;
    return notes.filter((note) => searchInEditorText(value, note.content));
  };

  const sortNotes = (by: OrderBy, newSort: SortOrder) => {
    setSortBy({
      ...newSort,
    });
    let newNotes;
    if (newSort[by] === OrderDirection.ASC) {
      newNotes = notes.sort(
        (a: Note, b: Note) => new Date(b[by]).getTime() - new Date(a[by]).getTime()
      );
    } else {
      newNotes = notes.sort(
        (a: Note, b: Note) => new Date(a[by]).getTime() - new Date(b[by]).getTime()
      );
    }
    setNotes(newNotes);
    saveState(newNotes);
  };

  const providerValue = useMemo(
    () => ({
      notes,
      addNote,
      updateNote,
      deleteNote,
      setSearchValue,
      sortBy,
      getFilteredNotes,
      searchValue,
      sortNotes,
    }),
    [notes, searchValue, sortBy]
  );

  return (
    <DiaryContext.Provider value={providerValue}>
      {children}
    </DiaryContext.Provider>
  );
};

export { DiaryContext, DiaryContextProvider, useDiaryState };
