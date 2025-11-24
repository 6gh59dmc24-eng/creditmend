"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X,
  Image as ImageIcon,
  FileText as FileIcon
} from "lucide-react"

interface FileUpload {
  id: string
  file: File
  name: string
  size: number
  type: string
  status: "pending" | "uploading" | "success" | "error"
  progress: number
  error?: string
}

export default function DocumentUploadPage() {
  const [files, setFiles] = useState<FileUpload[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<FileUpload[]>([])

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-green-500" />
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />
    return <FileIcon className="h-8 w-8 text-blue-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileUpload[] = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
      progress: 0
    }))
    
    setFiles(prev => [...prev, ...newFiles])
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    setUploadProgress(prev => prev.filter(p => p.id !== id))
  }

  const uploadFile = async (fileUpload: FileUpload) => {
    setUploadProgress(prev => [...prev, { ...fileUpload, status: "uploading", progress: 0 }])
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => 
        prev.map(p => 
          p.id === fileUpload.id 
            ? { ...p, progress: Math.min(p.progress + 10, 90) }
            : p
        )
      )
    }, 200)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      clearInterval(interval)
      setUploadProgress(prev => 
        prev.map(p => 
          p.id === fileUpload.id 
            ? { ...p, status: "success" as const, progress: 100 }
            : p
        )
      )
    } catch {
      clearInterval(interval)
      setUploadProgress(prev => 
        prev.map(p => 
          p.id === fileUpload.id 
            ? { ...p, status: "error" as const, error: "Upload failed" }
            : p
        )
      )
    }
  }

  const uploadAllFiles = () => {
    files.forEach(file => {
      if (file.status === "pending") {
        uploadFile(file)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-gray-600 mt-2">Upload and manage your documents securely</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Drag and drop files here or click to browse. Supported formats: PDF, JPG, PNG, DOC, DOCX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={(e) => { e.preventDefault(); setDragActive(true) }}
            onDragLeave={(e) => { e.preventDefault(); setDragActive(false) }}
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Maximum file size: 10MB per file
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Files to Upload</CardTitle>
            <CardDescription>
              {files.length} file{files.length !== 1 ? 's' : ''} ready to upload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((fileUpload) => {
                const progress = uploadProgress.find(p => p.id === fileUpload.id)
                return (
                  <div key={fileUpload.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getFileIcon(fileUpload.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {fileUpload.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(fileUpload.size)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {progress?.status === "success" && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {progress?.status === "error" && (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(fileUpload.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      {progress && progress.status === "uploading" && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Uploading...</span>
                            <span>{progress.progress}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                          {progress.error && (
                            <p className="text-xs text-red-500 mt-1">{progress.error}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={uploadAllFiles} 
                disabled={uploadProgress.some(p => p.status === "uploading")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload All Files
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Accepted File Types</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• PDF documents</li>
                <li>• JPG and PNG images</li>
                <li>• Microsoft Word documents</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security & Privacy</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• All files are encrypted at rest</li>
                <li>• Secure SSL/TLS transmission</li>
                <li>• Access controlled by permissions</li>
                <li>• Regular security audits</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}