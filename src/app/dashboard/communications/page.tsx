'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  Paperclip,
  Search,
  Filter,
} from 'lucide-react';

export default function CommunicationsPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const communications = [
    {
      id: 1,
      type: 'email',
      direction: 'inbound',
      sender: 'John Agent',
      subject: 'Credit Report Update',
      content:
        'Your latest credit report from Experian has been uploaded to your portal. Please review and let us know if you have any questions.',
      date: '2024-01-20T10:30:00Z',
      isRead: true,
    },
    {
      id: 2,
      type: 'email',
      direction: 'outbound',
      sender: 'You',
      recipient: 'support@creditrepair.com',
      subject: 'Question about dispute status',
      content:
        'Hi, I wanted to check on the status of my dispute with the collection account. When can I expect to hear back from the credit bureau?',
      date: '2024-01-19T14:15:00Z',
      isRead: false,
    },
    {
      id: 3,
      type: 'phone',
      direction: 'inbound',
      sender: 'Sarah Agent',
      subject: 'Client Call - Document Request',
      content:
        'Client needs to upload proof of address for the upcoming dispute. Discussed required documents and timeline.',
      date: '2024-01-18T16:45:00Z',
      isRead: true,
    },
    {
      id: 4,
      type: 'portal_message',
      direction: 'inbound',
      sender: 'System',
      subject: 'Dispute Letter Sent',
      content:
        'Your dispute letter for Experian has been generated and sent. Expected response time: 30 days.',
      date: '2024-01-17T09:00:00Z',
      isRead: true,
    },
  ];

  const filteredCommunications = communications.filter(
    comm =>
      ((filterType === 'all' || comm.type === filterType) &&
        comm.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      comm.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'portal_message':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === 'outbound' ? 'text-blue-600' : 'text-gray-600';
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Send message to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="rounded-md border-gray-300 px-3 py-2 text-sm">
            <option value="all">All Messages</option>
            <option value="email">Email</option>
            <option value="phone">Phone Calls</option>
            <option value="portal_message">Portal Messages</option>
          </select>
        </div>
      </div>

      {/* New Message Compose */}
      <Card>
        <CardHeader>
          <CardTitle>Compose New Message</CardTitle>
          <CardDescription>
            Send a message to your credit repair agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full h-24 rounded-md border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredCommunications.map(communication => (
          <Card
            key={communication.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedMessage === communication.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() =>
              setSelectedMessage(
                selectedMessage === communication.id ? null : communication.id
              )
            }>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(communication.type)}
                  <div>
                    <CardTitle className="text-lg">
                      {communication.subject}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      <span
                        className={`font-medium ${getDirectionColor(communication.direction)}`}>
                        {communication.sender}
                      </span>
                      <span className="text-gray-400">
                        {communication.direction === 'outbound' ? '→' : '←'}{' '}
                        {communication.recipient || 'You'}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(communication.date).toLocaleDateString()}
                  </span>
                  {!communication.isRead && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">{communication.content}</p>
                {communication.direction === 'outbound' && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Paperclip className="h-4 w-4" />
                    <span>Attachment: dispute_letter_001.pdf</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommunications.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No communications found
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? 'No messages match your search criteria.'
              : 'No communications in this category.'}
          </p>
        </div>
      )}
    </div>
  );
}
