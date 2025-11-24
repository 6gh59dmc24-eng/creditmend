"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Users,
  Video,
  Phone,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  duration: string
  type: "meeting" | "call" | "video" | "appointment"
  client?: string
  location?: string
  description?: string
  status: "scheduled" | "completed" | "cancelled"
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showAddEvent, setShowAddEvent] = useState(false)

  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Client Consultation - John Smith",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "1 hour",
      type: "meeting",
      client: "John Smith",
      location: "Office",
      description: "Initial consultation and credit report review",
      status: "scheduled"
    },
    {
      id: "2",
      title: "Dispute Review Call",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "30 min",
      type: "call",
      client: "Emily Davis",
      description: "Review recent dispute responses",
      status: "scheduled"
    },
    {
      id: "3",
      title: "Video Conference - Robert Brown",
      date: "2024-01-16",
      time: "11:00 AM",
      duration: "45 min",
      type: "video",
      client: "Robert Brown",
      description: "Progress update and next steps",
      status: "scheduled"
    }
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting": return <Users className="h-4 w-4" />
      case "call": return <Phone className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-100 text-blue-800 border-blue-200"
      case "call": return "bg-green-100 text-green-800 border-green-200"
      case "video": return "bg-purple-100 text-purple-800 border-purple-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  })

  const days = getDaysInMonth(currentDate)

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Calendar & Scheduling</h1>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowAddEvent(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {monthYear}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Monthly calendar view
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2">{day}</div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[80px] p-2 border rounded-lg ${
                        day ? 'hover:bg-gray-50 cursor-pointer' : ''
                      }`}
                      onClick={() => day && console.log('Date selected:', day)}
                    >
                      {day && (
                        <>
                          <div className="text-sm font-medium">{day}</div>
                          <div className="mt-1 space-y-1">
                            {events
                              .filter(event => {
                                const eventDate = new Date(event.date)
                                return eventDate.getDate() === day &&
                                  eventDate.getMonth() === currentDate.getMonth() &&
                                  eventDate.getFullYear() === currentDate.getFullYear()
                              })
                              .slice(0, 2)
                              .map(event => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded border ${getEventColor(event.type)}`}
                                >
                                  <div className="flex items-center gap-1">
                                    {getEventIcon(event.type)}
                                    <span className="truncate">{event.time}</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.slice(0, 5).map(event => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Events</span>
                  <span className="font-medium">{events.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Meetings</span>
                  <span className="font-medium">
                    {events.filter(e => e.type === "meeting").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Calls</span>
                  <span className="font-medium">
                    {events.filter(e => e.type === "call").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input id="eventTitle" placeholder="Enter event title" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventDate">Date</Label>
                  <Input id="eventDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="eventTime">Time</Label>
                  <Input id="eventTime" type="time" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <select id="eventType" className="w-full p-2 border rounded-md">
                  <option value="meeting">Meeting</option>
                  <option value="call">Phone Call</option>
                  <option value="video">Video Conference</option>
                  <option value="appointment">Appointment</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="eventLocation">Location</Label>
                <Input id="eventLocation" placeholder="Office, Phone, Video link, etc." />
              </div>
              
              <div>
                <Label htmlFor="eventDescription">Description</Label>
                <textarea 
                  id="eventDescription" 
                  className="w-full p-2 border rounded-md" 
                  rows={3}
                  placeholder="Event details and notes"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowAddEvent(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowAddEvent(false)}>
                Add Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}