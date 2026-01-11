import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, BookOpen, Briefcase, Award, Clock, Play, 
  Calendar, TrendingUp, LogOut, Settings, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Chatbot from "@/components/Chatbot";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Demo User");

  useEffect(() => {
    // Check if user is logged in (in real app, check session/token)
    const isLoggedIn = localStorage.getItem("zentureLoggedIn");
    if (!isLoggedIn) {
      // For demo purposes, allow access
    }
  }, []);

  const enrolledCourses = [
    {
      id: 1,
      title: "Full Stack Development",
      progress: 65,
      nextLesson: "Building REST APIs with Node.js",
      instructor: "Rahul Kumar",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=120&fit=crop",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      progress: 30,
      nextLesson: "Introduction to Pandas",
      instructor: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop",
    },
  ];

  const internshipStatus = {
    status: "In Progress",
    track: "Web Development",
    startDate: "Jan 15, 2024",
    endDate: "Mar 15, 2024",
    mentor: "Vikram Singh",
    tasksCompleted: 12,
    totalTasks: 20,
  };

  const certificates = [
    { id: 1, title: "HTML & CSS Fundamentals", date: "Dec 2023", type: "Course Completion" },
    { id: 2, title: "JavaScript Essentials", date: "Jan 2024", type: "Course Completion" },
  ];

  const upcomingEvents = [
    { title: "Live Session: React Hooks", time: "Today, 4:00 PM", type: "class" },
    { title: "Mentor Meeting", time: "Tomorrow, 11:00 AM", type: "meeting" },
    { title: "Project Deadline", time: "Jan 25, 2024", type: "deadline" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="glass-card border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-semibold">Welcome back, {userName}!</h1>
              <p className="text-xs text-muted-foreground">Student Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <Chatbot />

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: BookOpen, label: "Enrolled Courses", value: "2", color: "from-blue-500 to-cyan-500" },
            { icon: Clock, label: "Hours Learned", value: "48", color: "from-purple-500 to-pink-500" },
            { icon: Award, label: "Certificates", value: "2", color: "from-green-500 to-emerald-500" },
            { icon: TrendingUp, label: "Avg Progress", value: "47%", color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-display font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">My Courses</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate("/courses")}>
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-24 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        Next: {course.nextLesson}
                      </p>
                      <div className="flex items-center gap-3">
                        <Progress value={course.progress} className="flex-1 h-2" />
                        <span className="text-xs font-medium">{course.progress}%</span>
                      </div>
                    </div>
                    <Button size="sm" className="gradient-bg text-primary-foreground">
                      <Play className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Internship Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold">Internship Status</h2>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  {internshipStatus.status}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Track</p>
                      <p className="font-medium">{internshipStatus.track}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Mentor</p>
                      <p className="font-medium">{internshipStatus.mentor}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{internshipStatus.startDate} - {internshipStatus.endDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tasks Progress</p>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={(internshipStatus.tasksCompleted / internshipStatus.totalTasks) * 100} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-sm font-medium">
                        {internshipStatus.tasksCompleted}/{internshipStatus.totalTasks}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 rounded-3xl"
            >
              <h2 className="text-xl font-display font-semibold mb-6">My Certificates</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{cert.title}</h3>
                      <p className="text-xs text-muted-foreground">{cert.type} • {cert.date}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 rounded-3xl"
            >
              <h2 className="text-lg font-display font-semibold mb-4">Upcoming</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      event.type === 'class' ? 'bg-blue-500' :
                      event.type === 'meeting' ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 rounded-3xl"
            >
              <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/courses")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/internship")}>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Apply for Internship
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
