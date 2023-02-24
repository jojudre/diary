import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note, OrderDirection, SortOrder } from 'types';
import { formatDate, loadState, saveState } from 'utils';
import { OutputData } from '@editorjs/editorjs';

interface DiaryContextValue {
  notes: Note[];
  searchValue: string;
  sortBy: SortOrder;
  addNote: () => void;
  updateNote: (id: string, content: OutputData) => void;
  deleteNote: (id: string) => void;
  setSearchValue: (value: string) => void;
  sortByCreated: (order: OrderDirection) => void;
  sortByUpdated: (order: OrderDirection) => void;
}

const DiaryContext = createContext<DiaryContextValue>({
  notes: [],
  searchValue: '',
  sortBy: {
    createdAt: OrderDirection.ASC,
    updatedAt: OrderDirection.ASC,
  },
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  setSearchValue: () => {},
  sortByCreated: () => {},
  sortByUpdated: () => {},
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
    const newNotes = notes.map((note: Note) => (note.id === id ? { ...note, content: JSON.stringify(content) } : note));
    setNotes(newNotes);
    saveState(newNotes);
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((note: Note) => note.id !== id);
    setNotes(newNotes);
    saveState(newNotes);
  };

  const sortByCreated = (order: OrderDirection) => {
    setSortBy({
      ...sortBy,
      createdAt: order,
    });
    if (order === OrderDirection.ASC) {
      const newNotes = notes.sort(
        (a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setNotes(newNotes);
      saveState(newNotes);
    } else {
      const newNotes = notes.sort(
        (a: Note, b: Note) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setNotes(newNotes);
      saveState(newNotes);
    }
  };

  const sortByUpdated = (order: OrderDirection) => {
    setSortBy({
      ...sortBy,
      updatedAt: order,
    });
    if (order === OrderDirection.ASC) {
      const newNotes = notes.sort(
        (a: Note, b: Note) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setNotes(newNotes);
      saveState(newNotes);
    } else {
      const newNotes = notes.sort(
        (a: Note, b: Note) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
      setNotes(newNotes);
      saveState(newNotes);
    }
  };

  const providerValue = useMemo(
    () => ({
      notes,
      addNote,
      updateNote,
      deleteNote,
      setSearchValue,
      sortByCreated,
      sortByUpdated,
      searchValue,
      sortBy,
    }),
    [
      notes,
      searchValue,
      sortBy,
      addNote,
      updateNote,
      deleteNote,
      setSearchValue,
      sortByCreated,
      sortByUpdated,
    ]
  );

  return (
    <DiaryContext.Provider value={providerValue}>
      {children}
    </DiaryContext.Provider>
  );
};

export { DiaryContext, DiaryContextProvider, useDiaryState };
