"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react";

const blogPosts = [
  { id: 1, title: "Understanding Heart Health: Prevention is Key", excerpt: "Learn about the importance of regular cardiac checkups and lifestyle changes that can prevent heart diseases.", image: "/images/blog/heart-health.jpg", category: "Cardiology", date: "April 10, 2026", readTime: "5 min read", featured: true },
  { id: 2, title: "Mental Health Matters: Breaking the Stigma", excerpt: "Mental health is just as important as physical health. Discover how to prioritize your psychological well-being.", image: "/images/blog/mental-health.jpg", category: "Mental Health", date: "April 8, 2026", readTime: "4 min read" },
  { id: 3, title: "Nutrition Tips for a Healthy Lifestyle", excerpt: "Balanced diet is the foundation of good health. Expert tips on eating right and maintaining optimal weight.", image: "/images/blog/nutrition.jpg", category: "Nutrition", date: "April 5, 2026", readTime: "6 min read" },
  { id: 4, title: "Diabetes Management: Living a Healthy Life", excerpt: "Tips and strategies for managing diabetes effectively and maintaining quality of life.", image: "/images/blog/diabetes.jpg", category: "Diabetes Care", date: "April 2, 2026", readTime: "5 min read" },
  { id: 5, title: "Women's Health: Regular Checkups Save Lives", excerpt: "Why women should prioritize regular health screenings and preventive care.", image: "/images/blog/womens-health.jpg", category: "Women's Health", date: "March 28, 2026", readTime: "4 min read" },
  { id: 6, title: "Child Vaccination: A Parent's Guide", excerpt: "Everything you need to know about childhood vaccinations and their importance.", image: "/images/blog/vaccination.jpg", category: "Pediatrics", date: "March 25, 2026", readTime: "7 min read" },
  { id: 7, title: "How to Prepare for a Fasting Blood Test", excerpt: "Step-by-step guide on proper fasting procedures to ensure accurate blood test results every time.", image: "/images/blog/fasting-blood-test.jpg", category: "Lab Tests", date: "March 22, 2026", readTime: "3 min read" },
  { id: 8, title: "Managing High Blood Pressure Naturally", excerpt: "Effective lifestyle changes and natural remedies to keep your blood pressure under control.", image: "/images/blog/blood-pressure.jpg", category: "Cardiovascular", date: "March 18, 2026", readTime: "5 min read" },
  { id: 9, title: "Importance of Regular Health Checkups", excerpt: "Why annual health screenings are crucial for early detection and prevention of diseases.", image: "/images/blog/checkup.jpg", category: "Preventive Care", date: "March 15, 2026", readTime: "4 min read" },
  { id: 10, title: "Understanding Common Lab Tests", excerpt: "A comprehensive guide to understanding your blood work and what each test means for your health.", image: "/images/blog/lab-tests.jpg", category: "Lab Tests", date: "March 12, 2026", readTime: "6 min read" },
  { id: 11, title: "Healthy Sleep Habits for Better Life", excerpt: "Tips and strategies to improve your sleep quality and overall well-being through better rest.", image: "/images/blog/sleep.jpg", category: "Wellness", date: "March 10, 2026", readTime: "5 min read" },
  { id: 12, title: "Home Care Services: When to Consider", excerpt: "Learn when home healthcare services are beneficial and how they can support recovery and daily living.", image: "/images/blog/home-care.jpg", category: "Home Care", date: "March 5, 2026", readTime: "4 min read" },
];

const categories = ["All", "Cardiology", "Mental Health", "Nutrition", "Diabetes Care", "Lab Tests"];

export default function BlogClientView() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  
  const filteredPosts = activeCategory === "All" 
    ? blogPosts.filter(p => !p.featured) 
    : blogPosts.filter(p => p.category === activeCategory && !p.featured);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Featured Post Hero */}
      <section className="relative pt-24 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-3/5 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-6 left-6">
                <span className="bg-secondary-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Featured Article
                </span>
              </div>
            </div>
            <div className="w-full lg:w-2/5 space-y-6">
              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                <span className="text-primary-600 font-bold uppercase tracking-tight">{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={14}/> {featuredPost.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                {featuredPost.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <button className="flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 group">
                Read Full Article <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filter */}
      <section className="py-12 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "bg-slate-100 text-slate-500 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-primary-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-slate-800 mb-4 group-hover:text-primary-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <button className="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                      Continue Reading <ArrowRight size={14}/>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Newsletter CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative bg-primary-900 rounded-[3rem] p-10 md:p-20 overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500 rounded-full -ml-32 -mb-32" />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-widest">
                  <Mail size={14}/> Newsletter
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
                  Health Insights <br />
                  <span className="text-secondary-400 font-extralight tracking-tighter italic">Direct to your Inbox.</span>
                </h2>
                <p className="text-primary-100 text-lg max-w-md">
                  Join 5,000+ subscribers for weekly medical news and wellness tips from our expert doctors.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl p-2 rounded-[2.5rem] border border-white/10">
                <form className="flex flex-col sm:flex-row gap-2 bg-white rounded-[2rem] p-2">
                  <input 
                    type="email" 
                    placeholder="Enter your professional email" 
                    className="flex-1 px-6 py-4 rounded-full text-slate-800 focus:outline-none text-sm"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-primary-600 text-white px-10 py-4 rounded-full font-bold hover:bg-secondary-500 transition-all shadow-xl active:scale-95"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}