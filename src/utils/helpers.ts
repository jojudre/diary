import { OutputData } from "@editorjs/editorjs";

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
};

export const searchInEditorText = (searchValue: string, content: string) => {
  let blockWithSearchValue = null;
  if (content) {
    const textObj: OutputData = JSON.parse(content);
    blockWithSearchValue = textObj.blocks.find((block) => {
      if (
        block.data?.text &&
        block.data?.text.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return true;
      }
      if (
        block.data?.items &&
        block.data?.items.find((item: string) =>
          item.toLowerCase().includes(searchValue.toLowerCase())
        )
      ) {
        return true;
      }
    });
  }
  return blockWithSearchValue;
};