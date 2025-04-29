import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { lowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaLink, FaUnlink, 
         FaImage, FaTable, FaQuoteRight, FaListUl, FaListOl, FaAlignLeft, 
         FaAlignCenter, FaAlignRight, FaAlignJustify, FaUndo, FaRedo, FaHeading, 
         FaParagraph, FaSubscript, FaSuperscript, FaFileWord, FaFilePdf, FaFileCode, 
         FaPrint, FaExpand, FaCompress, FaSmile, FaVideo, FaMusic, FaPaintRoller, 
         FaEraser, FaMagic, FaLowVision } from 'react-icons/fa';

// Register languages with lowlight
// lowlight.registerLanguage('html', html);
// lowlight.registerLanguage('css', css);
// lowlight.registerLanguage('js', js);

const RichTextEditor = ({ content = '', onChange = () => {}, editable = true }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Type something or use / for commands...',
      }),
      // CodeBlockLowlight.configure({
      //   // lowlight,
      // }),
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

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addTable = useCallback(() => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      {/* Main Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {/* Undo/Redo */}
        <div className="flex border-r pr-2 mr-2">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Undo"
          >
            <FaUndo className="text-gray-700" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Redo"
          >
            <FaRedo className="text-gray-700" />
          </button>
        </div>

        {/* Text Formatting */}
        <div className="flex border-r pr-2 mr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Bold"
          >
            <FaBold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Italic"
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Underline"
          >
            <FaUnderline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Strikethrough"
          >
            <FaStrikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Inline Code"
          >
            <FaCode />
          </button>
        </div>

        {/* Headings & Paragraph */}
        <div className="flex border-r pr-2 mr-2">
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'paragraph') {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: parseInt(value) }).run();
              }
            }}
            value={
              editor.isActive('heading', { level: 1 })
                ? '1'
                : editor.isActive('heading', { level: 2 })
                ? '2'
                : editor.isActive('heading', { level: 3 })
                ? '3'
                : 'paragraph'
            }
            className="p-1 text-sm rounded border border-gray-300 bg-white"
          >
            <option value="paragraph"><FaParagraph className="inline mr-1" /> Paragraph</option>
            <option value="1"><FaHeading className="inline mr-1" /> Heading 1</option>
            <option value="2"><FaHeading className="inline mr-1" /> Heading 2</option>
            <option value="3"><FaHeading className="inline mr-1" /> Heading 3</option>
          </select>
        </div>

        {/* Lists */}
        <div className="flex border-r pr-2 mr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Bullet List"
          >
            <FaListUl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Numbered List"
          >
            <FaListOl />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Blockquote"
          >
            <FaQuoteRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded hover:bg-gray-200"
            title="Horizontal Rule"
          >
            <FaLowVision />
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex border-r pr-2 mr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Align Left"
          >
            <FaAlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Align Center"
          >
            <FaAlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Align Right"
          >
            <FaAlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Justify"
          >
            <FaAlignJustify />
          </button>
        </div>

        {/* Links & Media */}
        <div className="flex border-r pr-2 mr-2">
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Link"
          >
            <FaLink />
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-200"
            title="Image"
          >
            <FaImage />
          </button>
          <button
            onClick={addTable}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('table') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Table"
          >
            <FaTable />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Code Block"
          >
            <FaFileCode />
          </button>
        </div>

        {/* Colors */}
        <div className="flex border-r pr-2 mr-2">
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
            title="Text Color"
            data-testid="setColor"
          />
          <input
            type="color"
            onInput={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
            value="#ffff00"
            className="w-6 h-6 rounded border border-gray-300 cursor-pointer ml-1"
            title="Highlight Color"
            data-testid="setHighlightColor"
          />
        </div>

        {/* Superscript/Subscript */}
        <div className="flex border-r pr-2 mr-2">
          <button
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('superscript') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Superscript"
          >
            <FaSuperscript />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('subscript') ? 'bg-gray-200 text-blue-600' : ''}`}
            title="Subscript"
          >
            <FaSubscript />
          </button>
        </div>

        {/* Format Painter */}
        <div className="flex border-r pr-2 mr-2">
          <button
            className="p-2 rounded hover:bg-gray-200"
            title="Format Painter"
          >
            <FaPaintRoller />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="p-2 rounded hover:bg-gray-200"
            title="Clear Formatting"
          >
            <FaEraser />
          </button>
        </div>

        {/* Export/Print */}
        <div className="flex border-r pr-2 mr-2">
          <button
            className="p-2 rounded hover:bg-gray-200"
            title="Export to Word"
          >
            <FaFileWord />
          </button>
          <button
            className="p-2 rounded hover:bg-gray-200"
            title="Export to PDF"
          >
            <FaFilePdf />
          </button>
          <button
            className="p-2 rounded hover:bg-gray-200"
            title="Print"
          >
            <FaPrint />
          </button>
        </div>

        {/* Fullscreen */}
        <div className="flex">
          <button
            className="p-2 rounded hover:bg-gray-200"
            title="Fullscreen"
          >
            <FaExpand />
          </button>
        </div>
      </div>

      {/* Bubble Menu (appears when selecting text) */}
      {/* {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex bg-white shadow-lg rounded-lg p-1 border border-gray-200">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : ''}`}
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : ''}`}
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : ''}`}
            >
              <FaUnderline />
            </button>
            <button
              onClick={setLink}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200 text-blue-600' : ''}`}
            >
              <FaLink />
            </button>
          </div>
        </BubbleMenu>
      )} */}

      {/* Editor Content */}
      <EditorContent 
        editor={editor} 
        className="min-h-[300px] p-4 bg-white focus:outline-none prose max-w-none" 
      />
    </div>
  );
};

export default RichTextEditor;