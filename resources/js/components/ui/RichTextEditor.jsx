import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus'

import StarterKit from '@tiptap/starter-kit';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaLink,
  FaImage,
  FaTable,
  FaQuoteRight,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaUndo,
  FaRedo,
  FaHeading,
  FaParagraph,
  FaSubscript,
  FaSuperscript,
  FaFileWord,
  FaFilePdf,
  FaFileCode,
  FaPrint,
  FaExpand,
  FaEraser,
  FaLowVision,
  FaPaintRoller,
} from 'react-icons/fa';

const RichTextEditor = ({ content = '', onChange = () => {}, editable = true }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // codeBlock: false, // for future CodeBlockLowlight
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:underline',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Type something or use / for commands...',
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {/* Undo/Redo */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50" title="Undo">
            <FaUndo />
          </button>
          <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50" title="Redo">
            <FaRedo />
          </button>
        </div>

        {/* Formatting */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`} title="Bold"><FaBold /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`} title="Italic"><FaItalic /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`} title="Underline"><FaUnderline /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : ''}`} title="Strikethrough"><FaStrikethrough /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-200 text-blue-600' : ''}`} title="Inline Code"><FaCode /></button>
        </div>

        {/* Headings */}
        <div className="flex border-r pr-2 mr-2">
          <select onChange={(e) => {
            const value = e.target.value;
            if (value === 'paragraph') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
          }} value={
            editor.isActive('heading', { level: 1 }) ? '1' :
              editor.isActive('heading', { level: 2 }) ? '2' :
                editor.isActive('heading', { level: 3 }) ? '3' : 'paragraph'
          } className="p-1 text-sm rounded border border-gray-300 bg-white">
            <option value="paragraph">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>
        </div>

        {/* Lists */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : ''}`} title="Bullet List"><FaListUl /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : ''}`} title="Numbered List"><FaListOl /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-blue-600' : ''}`} title="Blockquote"><FaQuoteRight /></button>
          <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded hover:bg-gray-200" title="Horizontal Rule"><FaLowVision /></button>
        </div>

        {/* Alignment */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : ''}`} title="Align Left"><FaAlignLeft /></button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : ''}`} title="Align Center"><FaAlignCenter /></button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : ''}`} title="Align Right"><FaAlignRight /></button>
          <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-blue-600' : ''}`} title="Justify"><FaAlignJustify /></button>
        </div>

        {/* Media */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" onClick={setLink} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`} title="Link"><FaLink /></button>
          <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200" title="Image"><FaImage /></button>
          <button type="button" onClick={addTable} className="p-2 rounded hover:bg-gray-200" title="Table"><FaTable /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-200 text-blue-600' : ''}`} title="Code Block"><FaFileCode /></button>
        </div>

        {/* Colors */}
        <div className="flex border-r pr-2 mr-2">
          <input type="color" onInput={(e) => editor.chain().focus().setColor(e.target.value).run()} value={editor.getAttributes('textStyle').color || '#000000'} className="w-6 h-6 rounded border border-gray-300 cursor-pointer" title="Text Color" />
          <input type="color" onInput={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} value="#ffff00" className="w-6 h-6 rounded border border-gray-300 cursor-pointer ml-1" title="Highlight Color" />
        </div>

        {/* Super/Subscript */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('superscript') ? 'bg-gray-200 text-blue-600' : ''}`} title="Superscript"><FaSuperscript /></button>
          <button type="button" onClick={() => editor.chain().focus().toggleSubscript().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('subscript') ? 'bg-gray-200 text-blue-600' : ''}`} title="Subscript"><FaSubscript /></button>
        </div>

        {/* Other */}
        <div className="flex border-r pr-2 mr-2">
          <button type="button" className="p-2 rounded hover:bg-gray-200" title="Format Painter"><FaPaintRoller /></button>
          <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="p-2 rounded hover:bg-gray-200" title="Clear Formatting"><FaEraser /></button>
        </div>

        <div className="flex border-r pr-2 mr-2">
          <button type="button" className="p-2 rounded hover:bg-gray-200" title="Export to Word"><FaFileWord /></button>
          <button type="button" className="p-2 rounded hover:bg-gray-200" title="Export to PDF"><FaFilePdf /></button>
          <button type="button" className="p-2 rounded hover:bg-gray-200" title="Print"><FaPrint /></button>
        </div>

        <div className="flex">
          <button type="button" className="p-2 rounded hover:bg-gray-200" title="Fullscreen"><FaExpand /></button>
        </div>
      </div>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu editor={editor}>
          <div className="flex bg-white shadow-lg rounded-lg p-1 border border-gray-200">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`} title="Bold"><FaBold /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`} title="Italic"><FaItalic /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`} title="Underline"><FaUnderline /></button>
            <button type="button" onClick={setLink} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`} title="Link"><FaLink /></button>
          </div>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} className="min-h-[300px] p-4 bg-white focus:outline-none prose max-w-none" />
    </div>
  );
};

export default RichTextEditor;