import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Briefcase, Award, Target, Rocket } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: BookOpen,
      title: "Industry-Focused Training",
      description: "Curriculum designed by industry experts covering the latest technologies and methodologies.",
    },
    {
      icon: Users,
      title: "Live Mentorship",
      description: "One-on-one guidance from experienced professionals working in top tech companies.",
    },
    {
      icon: Briefcase,
      title: "Paid Internships",
      description: "Real work experience with stipends, working on live projects for real clients.",
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Industry-recognized certifications that boost your resume and career prospects.",
    },
    {
      icon: Target,
      title: "Career Guidance",
      description: "Personalized career counseling, resume building, and interview preparation.",
    },
    {
      icon: Rocket,
      title: "Placement Support",
      description: "Direct connections with 500+ hiring partners across various industries.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/30" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Empowering <span className="gradient-text">Future Tech Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            With over 5 years of experience, ZentureInfo Tech has been at the forefront of 
            transforming aspiring students into industry-ready professionals through comprehensive 
            training and real-world exposure.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 group"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 glass-card p-8 rounded-3xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5+", label: "Years of Excellence" },
              { number: "50+", label: "Expert Mentors" },
              { number: "100+", label: "Live Projects Completed" },
              { number: "15+", label: "Countries Reached" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
