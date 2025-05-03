import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageDropzone({
  onImageChange,     // callback to parent when file is selected
  initialImage = null, // optional initial preview (edit form)
  width = "w-100",      // Tailwind class for width
  height = "h-64",     // Tailwind class for height
  rounded = "rounded-lg" // Tailwind class for border radius
}) {
  const [image, setImage] = useState(null); // local preview state

  // Set initial image (useful for edit mode)
  useEffect(() => {
    if (initialImage) {
      setImage({  preview: `${import.meta.env.VITE_BACKEND_URL}/storage/${initialImage}` });
    }
  }, [initialImage]);

  // Handle image drop or selection
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImage(Object.assign(file, { preview }));
    
    // Send selected file to parent component
    if (onImageChange) {
      onImageChange(file);
    }
  }, [onImageChange]);

  // Setup Dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  // Return the dropzone UI
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-gray-400 p-2 text-center cursor-pointer ${width} ${height} flex justify-center items-center relative overflow-hidden ${rounded}`}
    >
      <input {...getInputProps()} />
      {image ? (
        <img
          src={image.preview}
          alt="Preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <p className="text-gray-500 z-10">
          {isDragActive ? 'Drop image here...' : 'Click or drag image'}
        </p>
      )}
    </div>
  );
}

export default ImageDropzone;
