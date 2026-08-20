import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const ProductEditor = ({ value, onChange }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value || '',

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  /*
   * Update editor when value changes externally
   */
  useEffect(() => {
    if (!editor) return;

    const currentHTML = editor.getHTML();
    const newHTML = value || '';

    if (currentHTML !== newHTML) {
      editor.commands.setContent(newHTML, false);
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-300 bg-white">

      {/* Toolbar */}

      <div className="border-b border-stone-200 bg-stone-50 p-2">
        {/* toolbar buttons */}
      </div>

      <EditorContent
        editor={editor}
        className="product-editor text-[13px] text-stone-500 px-3 py-3 focus:outline-none"
      />

    </div>
  );
};

export default ProductEditor;