"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download,
  Eye,
  Trash2,
  Calendar,
  User,
  CreditCard
} from "lucide-react"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const documents = [
    {
      id: 1,
      name: "Credit Report - Experian",
      category: "credit_report",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      type: "PDF"
    },
    {
      id: 2,
      name: "Government Issued ID",
      category: "id_verification",
      uploadDate: "2024-01-10",
      size: "1.2 MB",
      type: "JPG"
    },
    {
      id: 3,
      name: "Proof of Address",
      category: "proof_of_address",
      uploadDate: "2024-01-12",
      size: "856 KB",
      type: "PDF"
    },
    {
      id: 4,
      name: "Dispute Letter - Collection Account",
      category: "dispute_letter",
      uploadDate: "2024-01-20",
      size: "245 KB",
      type: "PDF"
    },
    {
      id: 5,
      name: "Bank Statement",
      category: "supporting_document",
      uploadDate: "2024-01-18",
      size: "1.8 MB",
      type: "PDF"
    }
  ]

  const categories = [
    { value: "all", label: "All Documents" },
    { value: "credit_report", label: "Credit Reports" },
    { value: "id_verification", label: "ID Verification" },
    { value: "proof_of_address", label: "Proof of Address" },
    { value: "dispute_letter", label: "Dispute Letters" },
    { value: "supporting_document", label: "Supporting Documents" },
    { value: "contract", label: "Contracts" },
    { value: "payment_proof", label: "Payment Proof" }
  ]

  const filteredDocuments = documents.filter(doc => 
    selectedCategory === "all" || doc.category === selectedCategory
  ).filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "credit_report": return <FileText className="h-4 w-4" />
      case "id_verification": return <User className="h-4 w-4" />
      case "proof_of_address": return <Upload className="h-4 w-4" />
      case "dispute_letter": return <FileText className="h-4 w-4" />
      case "supporting_document": return <Upload className="h-4 w-4" />
      case "contract": return <FileText className="h-4 w-4" />
      case "payment_proof": return <CreditCard className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(document.category)}
                  <div>
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {document.category.replace("_", " ").replace(/\b\w/g, word => word.toUpperCase())}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Uploaded: {document.uploadDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>Size: {document.size}</span>
                    <span>Type: {document.type}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? "No documents match your search criteria."
              : "No documents in this category."
            }
          </p>
        </div>
      )}
    </div>
  )
}