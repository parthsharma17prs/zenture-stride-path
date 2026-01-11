import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Play, Award, Clock, Users, Star, ArrowRight, Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/components/CoursesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import Chatbot from "@/components/Chatbot";
import { toast } from "sonner";

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const modes = ["Live", "Recorded"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    const matchesMode = !selectedMode || course.mode === selectedMode;
    return matchesSearch && matchesLevel && matchesMode;
  });

  const handleEnroll = (courseTitle: string) => {
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      toast.info("Please login to enroll in courses");
      return;
    }
    toast.success(`Successfully enrolled in ${courseTitle}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        isLoggedIn={isLoggedIn}
        onLogout={() => { setIsLoggedIn(false); setUserEmail(""); }}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={(email) => { setIsLoggedIn(true); setUserEmail(email); }}
      />
      <Chatbot />

      {/* Hero */}
      <section className="pt-32 pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              50+ Courses Available
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Explore Our <span className="gradient-text">Courses</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Industry-aligned courses designed by experts to prepare you for the real world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/80 backdrop-blur-lg z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              
              {/* Level Filter */}
              <div className="flex gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedLevel === level
                        ? "gradient-bg text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* Mode Filter */}
              <div className="flex gap-2">
                {modes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(selectedMode === mode ? null : mode)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedMode === mode
                        ? "gradient-bg text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {(selectedLevel || selectedMode) && (
                <button
                  onClick={() => { setSelectedLevel(null); setSelectedMode(null); }}
                  className="text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-hover overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-20`} />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      course.mode === "Live"
                        ? "bg-green-500 text-white"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {course.mode === "Live" && <Play className="w-3 h-3 mr-1" />}
                    {course.mode}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}+
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-bg text-primary-foreground group/btn"
                    onClick={() => handleEnroll(course.title)}
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CoursesPage;
