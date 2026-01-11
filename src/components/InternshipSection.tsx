import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, FileCheck, DollarSign, FileText, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InternshipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const perks = [
    {
      icon: Award,
      title: "Verified Certificate",
      description: "Industry-recognized certification upon completion",
    },
    {
      icon: FileCheck,
      title: "Completion Certificate",
      description: "Official internship completion documentation",
    },
    {
      icon: DollarSign,
      title: "Stipend",
      description: "Paid internships based on performance",
    },
    {
      icon: FileText,
      title: "Letter of Recommendation",
      description: "Personalized LOR from mentors",
    },
    {
      icon: Gift,
      title: "Goodie Bag",
      description: "Exclusive ZentureInfo merchandise",
    },
  ];

  return (
    <section id="internship" className="py-24 bg-gradient-to-b from-secondary/30 to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Internship Program
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Real-World <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance">
              Our internship program bridges the gap between academic knowledge and 
              industry requirements. Work on live projects, learn from experts, and 
              kickstart your professional journey.
            </p>

            {/* Structure */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary-foreground">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Training Phase</h4>
                  <p className="text-sm text-muted-foreground">
                    4-6 weeks of intensive skill development with hands-on projects
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary-foreground">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Project Assignment</h4>
                  <p className="text-sm text-muted-foreground">
                    Work on real client projects with mentorship support
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-primary-foreground">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Career Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Resume building, interview prep, and placement assistance
                  </p>
                </div>
              </div>
            </div>

            <Link to="/internship">
              <Button size="lg" className="gradient-bg text-primary-foreground shadow-glass-lg group">
                Apply for Internship
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Right - Perks Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4"
          >
            <div className="glass-card p-6 rounded-3xl">
              <h3 className="text-xl font-display font-semibold mb-6 gradient-text">
                Internship Perks
              </h3>
              <div className="space-y-4">
                {perks.map((perk, index) => (
                  <motion.div
                    key={perk.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                      <perk.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{perk.title}</h4>
                      <p className="text-sm text-muted-foreground">{perk.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
