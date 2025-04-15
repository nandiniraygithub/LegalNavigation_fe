import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import DOMPurify  from 'dompurify';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(post)

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .eq('published', true)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:underline flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </button>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {format(new Date(post.created_at), 'MMMM d, yyyy')}
      </time>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />
    </article>
  );
}
