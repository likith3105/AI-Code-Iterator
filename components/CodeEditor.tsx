// components/CodeEditor.tsx
import Editor from '@monaco-editor/react';

interface Props {
  value: string;
  onChange: (val: string | undefined) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  return (
    <Editor
      height="400px"
      language="javascript"
      theme="vs-dark"
      value={value}
      onChange={onChange}
    />
  );
}
