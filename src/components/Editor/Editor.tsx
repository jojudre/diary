import React, { FC, memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "./EditorTools";
import css from './Editor.module.scss';

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
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
        //@ts-ignore
        logLevel: "ERROR",
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };

  }, []);

  return <div id={holder} className={css.container} />;
};

export default memo(EditorBlock);