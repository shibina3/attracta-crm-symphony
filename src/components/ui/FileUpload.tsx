
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Loader2, Trash2, Upload } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  maxFiles = 5,
  accept = "*",
  multiple = true,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    setError(null);
    
    const fileList = Array.from(event.target.files);
    
    // Check if adding these files would exceed the maximum
    if (selectedFiles.length + fileList.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }
    
    // Update the selected files
    const newSelectedFiles = [...selectedFiles, ...fileList];
    setSelectedFiles(newSelectedFiles);
    onFilesSelected(newSelectedFiles);
    
    // Reset the input value to allow selecting the same file again
    event.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
    setError(null);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select files to upload");
      return;
    }

    setUploading(true);
    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUploading(false);
    
    // In a real implementation, you would upload the files here
    // and handle the response from the server
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Select Files
        </label>
        <Button 
          onClick={handleUpload} 
          disabled={selectedFiles.length === 0 || uploading}
          variant="default"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Files"
          )}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Files ({selectedFiles.length}/{maxFiles})</p>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-secondary/50 rounded-md"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
