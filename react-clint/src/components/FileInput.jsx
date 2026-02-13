import { useState, useCallback } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

export function FileInput({ onFile, disabled=false }) {
  const [isDragging, setIsDragging] = useState(false);

  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => onFile(file));
  }, [onFile, disabled]);
  
  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => onFile(file));
    e.target.value = '';
  }, [onFile]);
  
  return (
    <label
      className={`
        block border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer
        transition-colors
        ${isDragging ? 'border-primary bg-primary-light' : 'border-neutral-300 hover:border-primary'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <FaCloudUploadAlt size={40} className='text-neutral-400 mx-auto mb-2'/ >
      <p className="text-lg font-medium text-text-primary">اسحب الملفات هنا</p>
      <p className="text-sm text-text-secondary">أو اضغط لاختيار ملفات من الجهاز</p>
      
      <input
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        disabled={disabled}
      />
    </label>
  );
}