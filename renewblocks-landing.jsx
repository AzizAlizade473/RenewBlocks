import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, Weight, Thermometer, Droplets, Flame, 
  Recycle, FlaskConical, Factory, Cloud, ShieldCheck, Mail, ChevronRight, CheckCircle2
} from 'lucide-react';

// --- Design System Colors ---
const colors = {
  gray: '#2D3748',    // Concrete Gray
  emerald: '#1B4332', // Eco Emerald
  white: '#F7FAFC',   // Mineral White
};

// --- Helper Components ---

// Animated Counter for the Impact Section
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Fade In Up Animation Wrapper
const FadeInUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Main Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Technology', href: '#technology' },
    { name: 'Specs', href: '#specs' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-[#F7FAFC] border-b border-[#2D3748]/10 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-[#1B4332] mr-2 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#F7FAFC]" />
            </div>
            <span className="font-bold text-[#2D3748] text-2xl tracking-tight">Renew<span className="text-[#1B4332]">Blocks</span></span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-[#2D3748] hover:text-[#1B4332] font-medium text-sm tracking-wide transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-[#1B4332] text-[#F7FAFC] font-medium text-sm hover:bg-[#122e22] transition-colors rounded-sm">
              Partner With Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#2D3748] focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F7FAFC] border-b border-[#2D3748]/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-[#2D3748] font-medium w-full text-center hover:bg-[#2D3748]/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#2D3748] text-[#F7FAFC]">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1B4332]/20 transform skew-x-12 translate-x-32" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center px-3 py-1 bg-[#1B4332] text-sm font-semibold tracking-wider text-[#F7FAFC] rounded-sm mb-6 uppercase">
              Advanced Materials Startup • Baku
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Transforming Industrial Waste into the <span className="text-[#1B4332] bg-[#F7FAFC] px-2 leading-tight block sm:inline-block mt-2 sm:mt-0">Carbon-Negative</span> Skeleton of Future Cities.
            </h1>
            <p className="text-lg sm:text-xl text-[#F7FAFC]/80 mb-10 leading-relaxed font-light max-w-2xl">
              Advanced composite masonry units for high-rise partition walls. 50% lighter than natural stone, superior thermal insulation, and cured with industrial CO₂.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#specs" className="inline-flex justify-center items-center px-8 py-4 bg-[#1B4332] hover:bg-[#122e22] text-[#F7FAFC] font-semibold text-lg transition-all rounded-sm group">
                Request Technical Specs
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a href="#technology" className="inline-flex justify-center items-center px-8 py-4 bg-transparent border-2 border-[#F7FAFC] hover:bg-[#F7FAFC] hover:text-[#2D3748] text-[#F7FAFC] font-semibold text-lg transition-all rounded-sm">
                Learn the Science
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#2D3748] tracking-tight mb-4">The Dead Load Crisis vs. The Smart Matrix</h2>
          <p className="text-[#2D3748]/70 max-w-2xl mx-auto text-lg">Why traditional masonry is holding back modern high-rise development.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: The Old Way */}
          <FadeInUp delay={0.1}>
            <div className="bg-[#2D3748] p-10 h-full border border-[#2D3748] flex flex-col justify-between">
              <div>
                <div className="text-red-400 font-bold tracking-widest uppercase text-sm mb-4 border-b border-red-400/30 pb-2 inline-block">The Old Way</div>
                <h3 className="text-3xl font-bold text-[#F7FAFC] mb-6">Heavy Natural Limestone ("Kubik")</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <X className="text-red-400 mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-[#F7FAFC] text-lg">Massive Dead Load</p>
                      <p className="text-[#F7FAFC]/70 mt-1">Weighing 2,300 kg/m³, requiring over-engineered, expensive steel and concrete foundations.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-400 mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-[#F7FAFC] text-lg">Thermal Bridging</p>
                      <p className="text-[#F7FAFC]/70 mt-1">Poor insulation forces reliance on artificial heating and cooling systems.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-400 mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-[#F7FAFC] text-lg">Salt Efflorescence</p>
                      <p className="text-[#F7FAFC]/70 mt-1">Prone to structural and aesthetic degradation ("shoran") over time.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInUp>

          {/* Right: RenewBlocks */}
          <FadeInUp delay={0.3}>
            <div className="bg-[#1B4332] p-10 h-full border border-[#1B4332] shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <ShieldCheck size={250} />
              </div>
              <div className="relative z-10">
                <div className="text-[#F7FAFC] font-bold tracking-widest uppercase text-sm mb-4 border-b border-[#F7FAFC]/30 pb-2 inline-block">RenewBlocks</div>
                <h3 className="text-3xl font-bold text-[#F7FAFC] mb-6">The Smart Matrix</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#F7FAFC] mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-[#F7FAFC] text-lg">50% Lighter</p>
                      <p className="text-[#F7FAFC]/80 mt-1">Carbon-mineralized core drastically reduces structural requirements and logistics costs.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#F7FAFC] mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-[#F7FAFC] text-lg">Doubled Thermal Efficiency</p>
                      <p className="text-[#F7FAFC]/80 mt-1">Engineered porosity limits thermal transmittance, cutting HVAC operational loads.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="text-[#F7FAFC] mr-3 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-[#F7FAFC] text-lg">Hydrophobic Integrity</p>
                      <p className="text-[#F7FAFC]/80 mt-1">Prevents salt efflorescence and moisture ingress completely.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

const TechSpecs = () => {
  const specs = [
    { name: 'Compressive Strength', icon: <Factory size={20} />, target: '5.1 MPa', desc: 'Exceeds ASTM C129 standards for non-loadbearing masonry.' },
    { name: 'Density', icon: <Weight size={20} />, target: '~1,347 kg/m³', desc: 'Significant 50% reduction vs 2,300 kg/m³ natural stone.' },
    { name: 'Thermal Conductivity', icon: <Thermometer size={20} />, target: '~0.42 W/mK', desc: '50% lower thermal transmittance than dense concrete.' },
    { name: 'Water Absorption', icon: <Droplets size={20} />, target: '< 5%', desc: 'Hydrophobic matrix ensures superior moisture resistance.' },
    { name: 'Fire Safety', icon: <Flame size={20} />, target: 'Class B', desc: 'Requires standard gypsum finish for commercial compliance.' },
  ];

  return (
    <section id="specs" className="py-24 bg-[#F7FAFC] border-t border-[#2D3748]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] tracking-tight mb-4">Technical Specifications</h2>
            <p className="text-[#2D3748]/70 text-lg">Engineered for modern high-rise partition walls, thoroughly tested against global construction standards.</p>
          </div>

          <div className="overflow-x-auto rounded-sm border border-[#2D3748] shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2D3748] text-[#F7FAFC]">
                  <th className="py-5 px-6 font-semibold tracking-wide border-b border-[#2D3748] uppercase text-sm">Parameter</th>
                  <th className="py-5 px-6 font-semibold tracking-wide border-b border-[#2D3748] uppercase text-sm">Target Performance</th>
                  <th className="py-5 px-6 font-semibold tracking-wide border-b border-[#2D3748] uppercase text-sm hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="text-[#2D3748]">
                {specs.map((spec, index) => (
                  <tr key={index} className={`border-b border-[#2D3748]/10 hover:bg-[#F7FAFC] transition-colors ${index % 2 !== 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="py-4 px-6 font-medium flex items-center gap-3">
                      <span className="text-[#1B4332]">{spec.icon}</span>
                      {spec.name}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1B4332] whitespace-nowrap">{spec.target}</td>
                    <td className="py-4 px-6 text-sm text-[#2D3748]/80 hidden md:table-cell">{spec.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

const Technology = () => {
  const steps = [
    {
      num: '01',
      title: 'Upcycling',
      desc: 'Reclaiming industrial limestone fines and post-consumer polymeric waste.',
      icon: <Recycle size={32} />
    },
    {
      num: '02',
      title: 'Proprietary Matrix',
      desc: 'Blending with Proprietary Pozzolanic Densifiers (PPD) & Hygroscopic Micro-Fibers (HMF).',
      icon: <FlaskConical size={32} />
    },
    {
      num: '03',
      title: 'Vibro-Compression',
      desc: 'Zero-slump hydraulic pressing forms the high-density architectural skeleton.',
      icon: <Factory size={32} />
    },
    {
      num: '04',
      title: 'Carbon Mineralization',
      desc: '24-hour sealed curing using injected industrial CO₂, locking carbon into rock forever.',
      icon: <Cloud size={32} />
    }
  ];

  return (
    <section id="technology" className="py-24 bg-[#2D3748] text-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Science of Mineralization</h2>
          <p className="text-[#F7FAFC]/70 max-w-2xl mx-auto text-lg mb-8">A four-step industrial process that turns waste and emissions into structural assets.</p>
          
          <div className="inline-block bg-[#1B4332] p-4 rounded-sm border border-[#1B4332]/50 shadow-lg">
            <span className="text-sm uppercase tracking-wider text-[#F7FAFC]/70 block mb-2 font-semibold">Core Chemical Reaction</span>
            <code className="text-xl md:text-2xl font-mono text-[#F7FAFC]">Ca(OH)₂ + CO₂ &rarr; CaCO₃ + H₂O</code>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-[#F7FAFC]/10 z-0"></div>

          {steps.map((step, idx) => (
            <FadeInUp key={idx} delay={idx * 0.1} className="relative z-10">
              <div className="bg-[#2D3748] border border-[#F7FAFC]/20 p-8 h-full rounded-sm hover:border-[#1B4332] hover:bg-[#F7FAFC]/5 transition-all">
                <div className="w-16 h-16 bg-[#F7FAFC] text-[#2D3748] rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-[#2D3748]">
                  {step.icon}
                </div>
                <div className="text-[#1B4332] font-bold text-4xl opacity-50 absolute top-6 right-6 font-mono">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-[#F7FAFC]/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactCounters = () => {
  return (
    <section id="impact" className="py-20 bg-[#1B4332] text-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <FadeInUp delay={0.1}>
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-7xl font-extrabold mb-4 font-mono">
                <AnimatedCounter end={150} suffix="+" />
              </div>
              <div className="text-lg font-medium text-[#F7FAFC]/90">kg CO₂ Mineralized</div>
              <div className="text-sm text-[#F7FAFC]/60 mt-2">Per 1,000 blocks produced</div>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-7xl font-extrabold mb-4 font-mono">
                <AnimatedCounter end={120} />
              </div>
              <div className="text-lg font-medium text-[#F7FAFC]/90">Tons Polymer Waste</div>
              <div className="text-sm text-[#F7FAFC]/60 mt-2">Diverted annually per pilot line</div>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-7xl font-extrabold mb-4 font-mono">
                <AnimatedCounter end={30} suffix="%" />
              </div>
              <div className="text-lg font-medium text-[#F7FAFC]/90">Total Wall Cost Reduction</div>
              <div className="text-sm text-[#F7FAFC]/60 mt-2">Savings for developers vs traditional</div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    { name: 'Ziyad Shiraliyev', role: 'CEO / Founder', desc: 'Materials science lead driving the proprietary mix design and strategic vision.' },
    { name: 'Farid Valimammadov', role: 'COO', desc: 'Operations and supply chain integration expert for industrial scaling.' },
    { name: 'Rima Guliyeva', role: 'Academic Supervisor', desc: 'Senior researcher ensuring strict compliance with mechanical standards.' },
  ];

  return (
    <section className="py-24 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInUp>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3748] tracking-tight mb-4">Engineered in Azerbaijan</h2>
            <p className="text-[#2D3748]/70 text-lg">Developed by engineering experts at Baku Higher Oil School (SOCAR).</p>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <FadeInUp key={idx} delay={idx * 0.1}>
              <div className="bg-white p-8 border border-[#2D3748]/10 hover:border-[#1B4332] hover:shadow-lg transition-all rounded-sm group text-left h-full">
                <div className="w-16 h-16 bg-[#2D3748] rounded-sm mb-6 flex items-center justify-center text-[#F7FAFC]">
                  <span className="font-bold text-xl">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-[#2D3748] mb-1">{member.name}</h3>
                <p className="text-[#1B4332] font-semibold text-sm uppercase tracking-wide mb-4">{member.role}</p>
                <p className="text-[#2D3748]/70 text-sm">{member.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // Simulated Next.js API Route Handler
  // In a real Next.js environment, this would call fetch('/api/contact', { ... })
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate network latency & backend processing
    setTimeout(() => {
      setStatus('success');
      e.target.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#2D3748] text-[#F7FAFC] border-t-8 border-[#1B4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <FadeInUp>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">Build the Future with Us.</h2>
              <p className="text-[#F7FAFC]/70 text-lg mb-8 leading-relaxed">
                Whether you are a developer looking to cut structural costs, an architect designing for Net Zero, or an investor interested in scalable climate tech, we want to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#1B4332] flex items-center justify-center rounded-sm mr-4">
                    <Mail className="text-[#F7FAFC]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#F7FAFC]/50 uppercase tracking-wider font-semibold">Direct Inquiries</p>
                    <p className="text-lg font-medium">partners@renewblocks.az</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <div className="bg-white p-8 sm:p-10 rounded-sm border-2 border-[#1B4332] shadow-[8px_8px_0px_0px_rgba(27,67,50,1)] relative text-[#2D3748]">
              
              {status === 'success' ? (
                <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center p-8 text-center rounded-sm">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[#1B4332] mb-4"
                  >
                    <CheckCircle2 size={64} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#2D3748] mb-2">Request Received</h3>
                  <p className="text-[#2D3748]/70">Our technical team will send the Spec Sheet to your email shortly.</p>
                </div>
              ) : null}

              <h3 className="text-2xl font-bold mb-6 text-[#2D3748]">Request Technical Specs</h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">Full Name</label>
                    <input required type="text" className="w-full bg-[#F7FAFC] border border-[#2D3748]/20 focus:border-[#1B4332] focus:ring-0 px-4 py-3 outline-none transition-colors rounded-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">Corporate Email</label>
                    <input required type="email" className="w-full bg-[#F7FAFC] border border-[#2D3748]/20 focus:border-[#1B4332] focus:ring-0 px-4 py-3 outline-none transition-colors rounded-sm" placeholder="john@company.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">Company Name</label>
                  <input required type="text" className="w-full bg-[#F7FAFC] border border-[#2D3748]/20 focus:border-[#1B4332] focus:ring-0 px-4 py-3 outline-none transition-colors rounded-sm" placeholder="e.g. SOCAR Development" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">Role</label>
                    <select required defaultValue="" className="w-full bg-[#F7FAFC] border border-[#2D3748]/20 focus:border-[#1B4332] focus:ring-0 px-4 py-3 outline-none transition-colors rounded-sm appearance-none cursor-pointer">
                      <option value="" disabled>Select Role</option>
                      <option>Architect</option>
                      <option>Structural Engineer</option>
                      <option>Developer / Builder</option>
                      <option>Investor</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2D3748] mb-1">Est. Project Size (m²)</label>
                    <input type="number" className="w-full bg-[#F7FAFC] border border-[#2D3748]/20 focus:border-[#1B4332] focus:ring-0 px-4 py-3 outline-none transition-colors rounded-sm" placeholder="e.g. 5000" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2D3748] mb-1">Message (Optional)</label>
                  <textarea rows="3" className="w-full bg-[#F7FAFC] border border-[#2D3748]/20 focus:border-[#1B4332] focus:ring-0 px-4 py-3 outline-none transition-colors rounded-sm resize-none" placeholder="Tell us about your requirements..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-[#1B4332] hover:bg-[#122e22] text-[#F7FAFC] font-bold text-lg py-4 transition-colors flex justify-center items-center rounded-sm disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-2 border-[#F7FAFC] border-t-transparent rounded-full"
                    />
                  ) : (
                    "Get Specification Sheet"
                  )}
                </button>
              </form>
            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#2D3748] text-[#F7FAFC]/50 py-8 border-t border-[#F7FAFC]/10 text-sm text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} RenewBlocks. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="#" className="hover:text-[#F7FAFC] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#F7FAFC] transition-colors">Terms of Service</a>
          <span className="text-[#F7FAFC]/30">Baku, Azerbaijan</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main Application Assembly ---

export default function App() {
  return (
    <div className="font-sans bg-[#F7FAFC] min-h-screen selection:bg-[#1B4332] selection:text-[#F7FAFC]">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <TechSpecs />
      <Technology />
      <ImpactCounters />
      <Team />
      <ContactForm />
      <Footer />
    </div>
  );
}
