import React, { useState } from "react";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "Sample Image 1", url: "https://picsum.photos/400/300?random=1", type: "image/jpeg" },
    { name: "Sample Image 2", url: "https://picsum.photos/400/300?random=2", type: "image/jpeg" },
    { name: "Sample Image 3", url: "https://picsum.photos/400/300?random=3", type: "image/jpeg" },
    { name: "Sample Video", url: "https://www.w3schools.com/html/mov_bbb.mp4", type: "video/mp4" },
    null, null, null, null, null, null
  ]);
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = [
    {
      title: "Wedding Photography Shoot",
      desc: "Captured emotional wedding moments with natural lighting and cinematic framing.",
      tech: "Photography + Lightroom",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
    },
    {
      title: "Portrait Session",
      desc: "Studio portrait shoot focusing on lighting and expression.",
      tech: "Portrait Photography",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      title: "Street Photography Series",
      desc: "Documentary-style street moments capturing real-life emotion.",
      tech: "Street Photography",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
      title: "Product Photography",
      desc: "Clean commercial product shots for branding and marketing.",
      tech: "Studio Lighting",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      title: "Travel Photography",
      desc: "Landscape and travel storytelling from different locations.",
      tech: "Landscape Photography",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      title: "Event Coverage",
      desc: "Professional event documentation with candid shots.",
      tech: "Event Photography",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
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

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const emptySlotIndex = uploadedFiles.findIndex(slot => slot === null);
      if (emptySlotIndex === -1) {
        alert('All 10 slots are filled!');
        break;
      }
      const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
      try {
        console.log('Uploading file:', file.name);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Upload successful, URL:', downloadURL);
        setUploadedFiles(prev => {
          const newFiles = [...prev];
          newFiles[emptySlotIndex] = { name: file.name, url: downloadURL, type: file.type };
          return newFiles;
        });
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Upload failed: ' + error.message);
      }
    }
    e.target.value = "";
  };

  const deleteFile = (index) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
  };

  const ProjectDetail = ({ project, onBack }) => (
    <section className="px-8 py-16 max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg">
        ← Back to Portfolio
      </button>
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-400 mb-6">{project.desc}</p>
      <p className="text-sm text-gray-500 mb-8">{project.tech}</p>
      
      <h2 className="text-2xl font-bold mb-6">Project Gallery (10 Slots)</h2>

      {/* Uploaded Files Grid - 10 Slots */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {uploadedFiles.map((file, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition aspect-square relative">
            {file ? (
              <>
                {file.type.startsWith("image/") ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <video src={file.url} className="w-full h-full object-cover bg-gray-800" controls />
                )}
                <div className="p-2 bg-black bg-opacity-50 absolute bottom-0 left-0 right-0">
                  <p className="text-xs text-white truncate">{file.name}</p>
                  <button
                    onClick={() => deleteFile(i)}
                    className="mt-1 w-full bg-red-600 hover:bg-red-700 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-blue-400 transition">
                <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-xs text-center">Slot {i + 1}</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* NAV */}
      <header className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <h2 className="text-xl font-bold cursor-pointer" onClick={() => setCurrentPage("home")}>Yves Yrneh Paule</h2>
        <nav className="space-x-6 text-gray-300">
          <button onClick={() => setCurrentPage("home")} className="hover:text-white">About</button>
          <button onClick={() => setCurrentPage("home")} className="hover:text-white">Skills</button>
          <button onClick={() => setCurrentPage("home")} className="hover:text-white">Portfolio</button>
          <button onClick={() => setCurrentPage("upload")} className="hover:text-white">Upload</button>
          <button onClick={() => setCurrentPage("home")} className="hover:text-white">Contact</button>
        </nav>
      </header>

      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : currentPage === "upload" ? (
        // UPLOAD PAGE
        <section className="px-8 py-16 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Upload Your Files</h1>
          
          {/* Upload Box */}
          <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center mb-8 hover:border-blue-500 transition">
            <label className="cursor-pointer">
              <div className="flex flex-col items-center">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-lg font-semibold text-gray-300">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, MP4, MOV (Max 50MB)</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Uploaded Files Grid */}
          {uploadedFiles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Uploaded Files ({uploadedFiles.length})</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition">
                    {file.type.startsWith("image/") ? (
                      <img src={file.url} alt={file.name} className="w-full h-48 object-cover" />
                    ) : (
                      <video src={file.url} className="w-full h-48 object-cover bg-gray-800" controls />
                    )}
                    <div className="p-4">
                      <p className="text-sm text-gray-300 truncate">{file.name}</p>
                      <button
                        onClick={() => deleteFile(i)}
                        className="mt-3 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* HERO */}
          <section className="text-center py-20 px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm a Photographer
            </h1>
            <p className="text-gray-400 mb-6">
              I capture moments, emotions, and stories through my lens.
            </p>
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
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{p.desc}</p>
                  <small className="text-gray-500 block mt-2">{p.tech}</small>
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl"
                  >
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
        </>
      )}
    </div>
  );
}