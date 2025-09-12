"use client";

import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  frontmatterPlugin,
  tablePlugin,
  MDXEditorMethods,
  UndoRedo,
  linkPlugin,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  imagePlugin,
  InsertImage,
  sandpackPlugin,
  SandpackConfig,
  codeMirrorPlugin,
  linkDialogPlugin,
} from "@mdxeditor/editor";

interface EditorProps {
  markdown: string;
  onChange?: (value: string) => void;
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
    },
  ],
};

export default function Editor({ markdown, onChange, editorRef }: EditorProps) {
  return (
    <MDXEditor
      onChange={onChange}
      ref={editorRef ?? undefined}
      markdown={markdown ?? ""}
      className="dark-theme dark-editor"
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: "JavaScript", css: "CSS" },
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <UndoRedo />
              <ListsToggle />
              <BlockTypeSelect />
              <CodeToggle />
              <CreateLink />
              <InsertTable />
              <InsertThematicBreak />
              <InsertCodeBlock />
              <InsertImage />
            </>
          ),
        }),
        frontmatterPlugin(),
        tablePlugin(),
      ]}
    />
  );
}
