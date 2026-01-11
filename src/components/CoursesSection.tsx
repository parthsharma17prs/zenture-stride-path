import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, BarChart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const courses = [
  {
    id: 1,
    title: "Web Development",
    description: "Master HTML, CSS, JavaScript, and modern frameworks to build stunning websites.",
    duration: "12 Weeks",
    level: "Beginner",
    mode: "Live",
    students: 2500,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Full Stack Development",
    description: "Complete frontend and backend mastery with React, Node.js, and databases.",
    duration: "16 Weeks",
    level: "Intermediate",
    mode: "Live",
    students: 1800,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Data Science",
    description: "Learn Python, machine learning, and data visualization for analytics careers.",
    duration: "14 Weeks",
    level: "Intermediate",
    mode: "Live",
    students: 2100,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    description: "Deep learning, neural networks, and AI applications for the future.",
    duration: "18 Weeks",
    level: "Advanced",
    mode: "Live",
    students: 1200,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Cyber Security",
    description: "Ethical hacking, network security, and vulnerability assessment.",
    duration: "14 Weeks",
    level: "Intermediate",
    mode: "Recorded",
    students: 1500,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    color: "from-slate-500 to-zinc-600",
  },
  {
    id: 6,
    title: "Cloud Computing",
    description: "AWS, Azure, and GCP mastery for cloud architecture and DevOps.",
    duration: "12 Weeks",
    level: "Intermediate",
    mode: "Live",
    students: 1100,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    color: "from-sky-500 to-indigo-500",
  },
];

const CoursesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="courses" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Our Courses
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Learn <span className="gradient-text">In-Demand Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Industry-aligned courses designed to prepare you for the real world. 
            Learn from experts and build projects that matter.
          </p>
        </motion.div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                  {course.mode}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
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
                    <BarChart className="w-4 h-4" />
                    {course.level}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students.toLocaleString()}
                  </div>
                </div>

                <Link to={`/courses?course=${course.id}`}>
                  <Button className="w-full gradient-bg text-primary-foreground group/btn">
                    Enroll Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <Link to="/courses">
            <Button variant="outline" size="lg" className="group">
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
