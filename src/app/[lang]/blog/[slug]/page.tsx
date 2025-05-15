import React from 'react';
import { translations } from '@/translations';
import BlogPostClient from './BlogPostClient';

// Sample blog posts data (simplified version for the individual page)
const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Right Programming Language for Beginners',
    slug: 'how-to-choose-programming-language-beginners',
    excerpt: 'Starting your programming journey can be overwhelming with so many languages available. This guide will help you make the right choice based on your goals.',
    content: `
      <p>Starting your programming journey can be overwhelming with the multitude of languages available today. Each language has its own strengths, communities, and ideal use cases. This guide will help you narrow down your choices based on your specific goals and interests.</p>
      
      <h2>Consider Your Goals</h2>
      <p>Before diving into any programming language, it's important to define what you want to accomplish:</p>
      <ul>
        <li><strong>Web Development:</strong> If you're interested in creating websites, consider starting with HTML, CSS, and JavaScript.</li>
        <li><strong>Mobile App Development:</strong> For Android apps, Java or Kotlin are good choices. For iOS, Swift is the recommended language.</li>
        <li><strong>Data Science and AI:</strong> Python has become the standard for these fields due to its simplicity and powerful libraries.</li>
        <li><strong>Game Development:</strong> C# (with Unity) or C++ are commonly used in game development.</li>
        <li><strong>Enterprise Software:</strong> Java, C#, and Python are widely used in business applications.</li>
      </ul>
      
      <h2>Beginner-Friendly Languages</h2>
      <p>Some languages are more approachable for beginners than others. Here are some excellent starting points:</p>
      
      <h3>Python</h3>
      <p>Python is often recommended as a first language because of its readable syntax and versatility. It's widely used in web development, data science, AI, and automation.</p>
      <p>Example Python code:</p>
      <pre>
# A simple greeting program
name = input("What's your name? ")
print(f"Hello, {name}! Welcome to programming.")
      </pre>
      
      <h3>JavaScript</h3>
      <p>As the language of the web, JavaScript is essential for front-end development and increasingly popular for back-end development through Node.js.</p>
      <p>Example JavaScript code:</p>
      <pre>
// A simple greeting function
function greet(name) {
  return \`Hello, \${name}! Welcome to programming.\`;
}
console.log(greet("Learner"));
      </pre>
      
      <h2>Learning Resources</h2>
      <p>No matter which language you choose, having quality learning resources is essential:</p>
      <ul>
        <li><strong>Online Platforms:</strong> Codecademy, freeCodeCamp, and Coursera offer structured courses for beginners.</li>
        <li><strong>Documentation:</strong> Official language documentation is invaluable as you progress.</li>
        <li><strong>Community:</strong> Join forums like Stack Overflow or Reddit communities related to your chosen language.</li>
        <li><strong>Projects:</strong> Build small projects to apply what you've learned and build your portfolio.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Remember that your first programming language is just the beginning of your journey. Many developers become proficient in multiple languages throughout their careers. The most important thing is to start coding and learning the fundamental concepts that apply across languages.</p>
      
      <p>Once you've chosen a language, commit to it long enough to build something meaningful before considering whether to explore another language. Consistency and practice are key to becoming a successful programmer.</p>
    `,
    publishedAt: '2024-06-10',
    readTime: 8,
    category: 'programming',
    author: {
      name: 'Mohammed Ali',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      bio: 'Senior Software Engineer with 10+ years of experience. Passionate about teaching programming and mentoring new developers.'
    },
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    tags: ['programming', 'beginners', 'coding', 'education', 'tech career']
  },
  {
    id: 2,
    title: 'The Future of Digital Marketing in 2024',
    slug: 'future-digital-marketing-2024',
    excerpt: 'Explore emerging trends and technologies that are reshaping digital marketing strategies in 2024 and beyond.',
    content: `<p>Digital marketing continues to evolve at a rapid pace, with new technologies and changing consumer behaviors reshaping the landscape. In 2024, marketers need to adapt to these changes to stay competitive.</p>`,
    publishedAt: '2024-05-28',
    readTime: 6,
    category: 'marketing',
    author: {
      name: 'Sarah Benmoussa',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      bio: 'Digital Marketing Specialist and content strategist with expertise in SEO and social media marketing.'
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tags: ['marketing', 'digital marketing', 'trends', 'social media', 'SEO']
  },
  {
    id: 3,
    title: 'AI Ethics: Challenges and Considerations',
    slug: 'ai-ethics-challenges-considerations',
    excerpt: 'As AI becomes more integrated into our daily lives, understanding the ethical implications is crucial for responsible development.',
    content: `<p>Artificial Intelligence is transforming virtually every industry, from healthcare to education and beyond. With this rapid advancement comes a responsibility to consider the ethical implications.</p>`,
    publishedAt: '2024-05-15',
    readTime: 12,
    category: 'ai',
    author: {
      name: 'Karim Lahlou',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      bio: 'AI researcher and ethicist focusing on responsible AI development and implementation.'
    },
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    tags: ['AI', 'ethics', 'technology', 'future', 'machine learning']
  }
];

// Create a wrapper component for the client component
function BlogPostWrapper({
  post,
  relatedPosts,
  lang,
  t
}: {
  post: any;
  relatedPosts: any[];
  lang: string;
  t: any;
}) {
  return <BlogPostClient post={post} relatedPosts={relatedPosts} lang={lang} t={t} />;
}

export default function BlogPostPage({ params }: { params: { lang: string; slug: string } }) {
  const { lang, slug } = params;
  
  // Find the current post
  const post = blogPosts.find(p => p.slug === slug);
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) 
    : [];
  
  const t = translations[lang as keyof typeof translations] || translations.fr;
  
  return <BlogPostWrapper post={post} relatedPosts={relatedPosts} lang={lang} t={t} />;
}

// Static params for Next.js static export
export function generateStaticParams() {
  const locales = ['fr', 'en', 'ar'];
  const slugs = blogPosts.map(post => post.slug);
  
  const params: { lang: string; slug: string }[] = [];
  locales.forEach(locale => {
    slugs.forEach(slug => {
      params.push({ lang: locale, slug });
    });
  });
  
  return params;
} 