import React, {useState} from 'react'
import ImageDropzone from '../../ui/ImageDropzone'
import RichTextEditor from '../../ui/RichTextEditor';

export default function PostList() {
     const [uploadedFile, setUploadedFile] = useState(null);
      const [body, setBody] = useState('<p>Initial content</p>');

  const handleImageChange = (file) => {
    setUploadedFile(file);
    // you can now upload this to Laravel backend
  };

   

  const handleEditorChange = (newContent) => {
    setBody(newContent);
  };
  return (
    <div>
        <div className="p-4">
      <h2 className="text-xl mb-2">Upload Thumbnail</h2>
      <ImageDropzone onImageChange={handleImageChange} />

      {uploadedFile && (
        <p className="mt-4 text-green-600">File ready to upload: {uploadedFile.name}</p>
      )}
    </div>
   <RichTextEditor content={body} onChange={handleEditorChange} />

    </div>
  )
}
