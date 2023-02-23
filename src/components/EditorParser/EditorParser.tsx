import { OutputData } from '@editorjs/editorjs';
import React from 'react';
import css from './EditorParser.module.scss';

const editorJsHtml = require('editorjs-html');

const EditorJsToHtml = editorJsHtml();

type Props = {
  data: OutputData;
};

type ParsedContent = string | JSX.Element;

const EditorParser = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[];

  return (
    <div key={data.time} className={css.content}>
      {html.map((item, index) => {
        if (typeof item === 'string') {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index} />
          );
        }
        return item;
      })}
    </div>
  );
};

export default EditorParser;
