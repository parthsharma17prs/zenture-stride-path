import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, BookOpen, Code, Briefcase, Award } from "lucide-react";

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const stages = [
    {
      icon: UserPlus,
      title: "Enrollment",
      description: "Sign up for your chosen course and get access to learning materials, community, and mentors.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Training",
      description: "Intensive training with live sessions, hands-on projects, and regular assessments.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "Live Project",
      description: "Apply your skills on real-world projects with industry clients and expert guidance.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Briefcase,
      title: "Internship",
      description: "Join our paid internship program and gain professional work experience.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Award,
      title: "Certificate & Placement",
      description: "Receive your certificates and get placement support from 500+ hiring partners.",
      color: "from-primary to-purple-700",
    },
  ];

  return (
    <section className="py-24 bg-background" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Your Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            From <span className="gradient-text">Learner to Leader</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Follow our proven path to transform from a beginner to an industry-ready professional.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="absolute top-0 left-0 right-0 gradient-bg"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg`}
                  >
                    <stage.icon className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                  <div
                    className={`glass-card-hover p-6 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {index + 1}
                    </span>
                    <h3 className="text-xl font-display font-semibold mt-1 mb-2">{stage.title}</h3>
                    <p className="text-muted-foreground">{stage.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
