import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, Award, DollarSign, FileText, Gift, CheckCircle, 
  ArrowRight, Users, Clock, Code, Rocket, Target, BookOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import Chatbot from "@/components/Chatbot";
import { toast } from "sonner";

const InternshipPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    resume: "",
    message: "",
  });

  const perks = [
    { icon: Award, title: "Verified Certificate", description: "Industry-recognized certification" },
    { icon: FileText, title: "Completion Certificate", description: "Official documentation" },
    { icon: DollarSign, title: "Stipend", description: "Performance-based pay" },
    { icon: FileText, title: "Letter of Recommendation", description: "Personalized LOR" },
    { icon: Gift, title: "Goodie Bag", description: "Exclusive merchandise" },
  ];

  const tracks = [
    { title: "Web Development", icon: Code, duration: "8 weeks", spots: 25 },
    { title: "Data Science", icon: Target, duration: "10 weeks", spots: 20 },
    { title: "AI/ML", icon: Rocket, duration: "12 weeks", spots: 15 },
    { title: "Cyber Security", icon: BookOpen, duration: "10 weeks", spots: 20 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Application submitted successfully! We'll review and get back to you within 48 hours.");
    setFormData({ name: "", email: "", phone: "", college: "", course: "", resume: "", message: "" });
    setIsSubmitting(false);
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
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
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
              Limited Spots Available
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Internship & <span className="gradient-text">Training Program</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Gain real-world experience, work on live projects, and kickstart your career 
              with our comprehensive internship program.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gradient-bg text-primary-foreground shadow-glass-lg">
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Briefcase className="mr-2 w-4 h-4" />
                View Tracks
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Internship Tracks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Choose Your <span className="gradient-text">Track</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select from our specialized internship tracks based on your interests and career goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <track.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{track.title}</h3>
                <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {track.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {track.spots} spots
                  </span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              What You'll <span className="gradient-text">Get</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <perk.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{perk.title}</h3>
                <p className="text-sm text-muted-foreground">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Apply <span className="gradient-text">Now</span>
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below to apply for our internship program.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="intern-name">Full Name</Label>
                    <Input
                      id="intern-name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intern-email">Email Address</Label>
                    <Input
                      id="intern-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="intern-phone">Phone Number</Label>
                    <Input
                      id="intern-phone"
                      type="tel"
                      placeholder="Enter your phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <Input
                      id="college"
                      placeholder="Enter your college name"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Preferred Track</Label>
                  <Select 
                    value={formData.course} 
                    onValueChange={(value) => setFormData({ ...formData, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an internship track" />
                    </SelectTrigger>
                    <SelectContent>
                      {tracks.map((track) => (
                        <SelectItem key={track.title} value={track.title}>
                          {track.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/Portfolio Link</Label>
                  <Input
                    id="resume"
                    type="url"
                    placeholder="https://your-resume-link.com"
                    value={formData.resume}
                    onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Why do you want to join?</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about yourself and why you're interested..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-bg text-primary-foreground shadow-glass-lg group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </span>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  By applying, you agree to our terms and privacy policy.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternshipPage;
