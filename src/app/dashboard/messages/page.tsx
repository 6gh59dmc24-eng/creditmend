"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  MessageSquare, 
  Send, 
  Reply, 
  Forward, 
  Trash2, 
  Search,
  Filter,
  Star,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface Message {
  id: string
  subject: string
  content: string
  sender: string
  recipient: string
  date: string
  time: string
  status: "sent" | "delivered" | "read" | "failed"
  priority: "low" | "medium" | "high"
  hasAttachment: boolean
  isStarred: boolean
  category: "inbox" | "sent" | "draft" | "trash"
}

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyMode, setReplyMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("inbox")
  const [composeMode, setComposeMode] = useState(false)

  const messages: Message[] = [
    {
      id: "1",
      subject: "Credit Report Update - John Smith",
      content: "Hi John, I wanted to update you on the progress of your credit repair case. We've successfully removed 2 negative items from your TransUnion report...",
      sender: "sarah.johnson@creditrepair.com",
      recipient: "john.smith@example.com",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "delivered",
      priority: "medium",
      hasAttachment: true,
      isStarred: true,
      category: "sent"
    },
    {
      id: "2",
      subject: "Question about dispute process",
      content: "Hello, I have a question about the dispute process. How long does it typically take to hear back from the credit bureaus?",
      sender: "emily.davis@example.com",
      recipient: "support@creditrepair.com",
      date: "2024-01-14",
      time: "2:15 PM",
      status: "read",
      priority: "low",
      hasAttachment: false,
      isStarred: false,
      category: "inbox"
    },
    {
      id: "3",
      subject: "URGENT: Document Required",
      content: "We need an updated copy of your utility bill to verify your address for the upcoming dispute round...",
      sender: "robert.brown@example.com",
      recipient: "support@creditrepair.com",
      date: "2024-01-13",
      time: "9:45 AM",
      status: "sent",
      priority: "high",
      hasAttachment: false,
      isStarred: false,
      category: "inbox"
    }
  ]

  const filteredMessages = messages.filter(message => {
    const matchesCategory = filterCategory === "all" || message.category === filterCategory
    const matchesSearch = !searchTerm || 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Clock className="h-4 w-4 text-blue-500" />
      case "delivered": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "read": return <CheckCircle className="h-4 w-4 text-gray-500" />
      case "failed": return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const selectedMessageData = messages.find(m => m.id === selectedMessage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <Button onClick={() => setComposeMode(true)}>
          <Send className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inbox</CardTitle>
              <CardDescription>
                {filteredMessages.length} messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="space-y-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="all">All Messages</option>
                    <option value="inbox">Inbox</option>
                    <option value="sent">Sent</option>
                    <option value="draft">Drafts</option>
                    <option value="trash">Trash</option>
                  </select>
                </div>
              </div>

              {/* Message List */}
              <div className="space-y-2">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedMessage === message.id ? "bg-blue-50 border-blue-200" : ""
                    }`}
                    onClick={() => {
                      setSelectedMessage(message.id)
                      setReplyMode(false)
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium truncate">
                            {message.sender === "support@creditrepair.com" ? message.recipient : message.sender}
                          </span>
                          {message.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                          {message.hasAttachment && <Paperclip className="h-3 w-3 text-gray-400" />}
                        </div>
                        <p className="text-sm text-gray-900 font-medium truncate">
                          {message.subject}
                        </p>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <span className="text-xs text-gray-500">{message.time}</span>
                        {getStatusIcon(message.status)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {message.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(message.priority)}`}>
                        {message.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          {selectedMessageData ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedMessageData.subject}</CardTitle>
                    <CardDescription>
                      From: {selectedMessageData.sender} • To: {selectedMessageData.recipient}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Message Metadata */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <span>{selectedMessageData.date} at {selectedMessageData.time}</span>
                      <span className={`px-2 py-1 rounded ${getPriorityColor(selectedMessageData.priority)}`}>
                        {selectedMessageData.priority.toUpperCase()}
                      </span>
                    </div>
                    {getStatusIcon(selectedMessageData.status)}
                  </div>

                  {/* Message Content */}
                  <div className="prose max-w-none">
                    <p className="text-gray-800 leading-relaxed">
                      {selectedMessageData.content}
                    </p>
                  </div>

                  {/* Attachments */}
                  {selectedMessageData.hasAttachment && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Attachments</h4>
                      <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Paperclip className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">credit_report_jan2024.pdf</span>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </div>
                  )}

                  {/* Reply Section */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Button 
                        variant="outline"
                        onClick={() => setReplyMode(!replyMode)}
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline">
                        <Forward className="h-4 w-4 mr-2" />
                        Forward
                      </Button>
                    </div>

                    {replyMode && (
                      <div className="space-y-4">
                        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Replying to:</span>
                            <span className="text-sm text-gray-600">
                              {selectedMessageData.subject}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyMode(false)}
                          >
                            Cancel Reply
                          </Button>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Original message: &quot;{messages.find(m => m.id === selectedMessage)?.content}&quot;
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
                <p className="text-gray-600 text-center">
                  Choose a message from the list to view its contents
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {composeMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">New Message</h2>
              <Button
                variant="ghost"
                onClick={() => setComposeMode(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">To:</Label>
                <Input
                  id="recipient"
                  placeholder="Enter email or select client"
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject:</Label>
                <Input
                  id="subject"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message:</Label>
                <textarea
                  id="message"
                  className="w-full p-3 border rounded-md min-h-[200px]"
                  placeholder="Type your message here..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setComposeMode(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setComposeMode(false)}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}