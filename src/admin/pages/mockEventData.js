// src/admin/pages/mockEventData.js

export const mockEvents = [
  {
    id: 1,
    title: "Mid-term Mindfulness Workshop",
    description: "A guided session to manage mid-term stress.",
    date: "2025-09-22",
    startTime: "14:00",
    endTime: "15:30",
    location: "Room 301, Student Center",
    host: "Dr. Anjali Sharma",
    rsvpEnabled: true,
    maxAttendees: 50,
    rsvpCount: 34,
    attendanceCount: 28,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Stress-Free Study Sessions",
    description: "Learn effective study techniques.",
    date: "2025-09-25",
    startTime: "16:00",
    endTime: "17:00",
    location: "Library Conference Room A",
    host: "Academic Success Team",
    rsvpEnabled: true,
    maxAttendees: 30,
    rsvpCount: 25,
    attendanceCount: null,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Mental Health First Aid Training",
    description: "Training on how to respond to mental health crises.",
    date: "2025-08-28",
    startTime: "10:00",
    endTime: "16:00",
    location: "Main Auditorium",
    host: "Campus Counseling Center",
    rsvpEnabled: true,
    maxAttendees: 100,
    rsvpCount: 78,
    attendanceCount: 65,
    status: "completed"
  }
];

export const mockRSVPs = [
  { id: 1, name: "Anonymous Phoenix", department: "Computer Science", year: "3rd Year", timestamp: "2025-09-10 09:15" },
  { id: 2, name: "Anonymous Eagle", department: "Psychology", year: "2nd Year", timestamp: "2025-09-11 10:30" },
  { id: 3, name: "Anonymous Wolf", department: "Engineering", year: "Final Year", timestamp: "2025-09-12 11:45" }
];