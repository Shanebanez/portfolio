import React from "react";

export default function App() {
  const projects = [
    {
      title: "Wedding Photography Shoot",
      desc: "Captured emotional wedding moments with natural lighting and cinematic framing.",
      tech: "Photography + Lightroom"
    },
    {
      title: "Portrait Session",
      desc: "Studio portrait shoot focusing on lighting and expression.",
      tech: "Portrait Photography"
    },
    {
      title: "Street Photography Series",
      desc: "Documentary-style street moments capturing real-life emotion.",
      tech: "Street Photography"
    },
    {
      title: "Product Photography",
      desc: "Clean commercial product shots for branding and marketing.",
      tech: "Studio Lighting"
    },
    {
      title: "Travel Photography",
      desc: "Landscape and travel storytelling from different locations.",
      tech: "Landscape Photography"
    },
    {
      title: "Event Coverage",
      desc: "Professional event documentation with candid shots.",
      tech: "Event Photography"
    }
  ];

  const skills = [
    "Photography",
    "Photo Editing",
    "Adobe Lightroom",
    "Adobe Photoshop",
    "Portrait Photography",
    "Lighting Techniques"
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* NAV */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <h2 className="text-xl font-bold">YourName</h2>
        <nav className="space-x-6 text-gray-300">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Portfolio</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I'm a Videographer
        </h1>
        <p className="text-gray-400 mb-6">
          I capture moments, emotions, and stories through my lens.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl">
          View My Work
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-8 py-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400">
          A dedicated and detail-oriented multimedia professional with over 10 years of experience in photography, videography, and video editing.

Proven ability to capture and produce high-quality visual content across a wide range of events, including weddings, pre-nuptial shoots, corporate functions, business meetings, and private celebrations.

A person with a hearing and speech disability, I bring a strong sense of focus, creativity, and resilience to my work. My condition has not limited my performance; instead, it has strengthened my visual awareness, attention to detail, and commitment to excellence in every project I undertake.

Seeking opportunities in a dynamic and growth-oriented environment where I can contribute my technical skills, artistic vision, and professionalism, while continuously developing and delivering impactful visual storytelling.
        </p>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-8 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="bg-gray-800 px-4 py-2 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-8 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Portfolio</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 p-5 rounded-2xl hover:scale-105 transition"
            >
              <div className="h-40 bg-gray-800 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                Photo Preview
              </div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{p.desc}</p>
              <small className="text-gray-500 block mt-2">{p.tech}</small>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl">
                View Project
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="text-gray-400">Email: your@email.com</p>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        © 2026 YourName. All rights reserved.
      </footer>
    </div>
  );
}