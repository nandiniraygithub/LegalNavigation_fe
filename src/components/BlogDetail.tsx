import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single(); // returns a single object instead of array

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800">Post not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline mt-2 block">
          Go back to blog list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-sm">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-72 object-cover rounded-md mb-6"
        />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        Published on {format(new Date(post.created_at), 'MMMM d, yyyy')}
      </p>
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
      <Link
        to="/"
        className="inline-block mt-10 text-indigo-600 font-medium hover:underline"
      >
        ← Back to all posts
      </Link>
    </div>
  );
}
