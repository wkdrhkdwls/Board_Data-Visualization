import { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout';
import { createClient } from '@supabase/supabase-js';

interface PostDTO {
  id: number;
  title: string;
  content: string;
  file_attachment: string;
  hastags: string[];
}
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseKey);
function Home() {
  const [post, setPost] = useState<PostDTO[]>([]);

  useEffect(() => {
    async function getPost() {
      const { data, error } = await supabase.from('post').select('*');
      if (error) {
        console.error('Error fetching todos:', error);
      } else {
        setPost(data || []);
      }
    }
    getPost();
  }, []);

  return (
    <Layout>
      <div className="w-full h-full flex justify-center flex-col">
        {post && post.length > 0 ? (
          <ul>
            {post.map((item, index) => (
              <li key={index}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </Layout>
  );
}

export default Home;
