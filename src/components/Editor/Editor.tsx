import React, {
  FC, memo, useEffect, useRef
} from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_TOOLS } from './EditorTools';

type EditorBlockProps = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock: FC<EditorBlockProps> = ({ data, onChange, holder }) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder,
        tools: EDITOR_TOOLS,
        data,
        placeholder: 'Let`s write an awesome story!',
        async onChange(api) {
          const dataSave = await api.saver.save();
          onChange(dataSave);
        },
        // @ts-ignore
        logLevel: 'ERROR',
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={holder} />;
};

export default memo(EditorBlock);
