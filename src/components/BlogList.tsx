import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import DOMPurify from "dompurify";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data ?? []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/post/${post.id}`}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="p-5 flex flex-col justify-between h-60">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p
                  className="text-gray-700 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content.slice(0, 150)),
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  {format(new Date(post.created_at), 'MMMM d, yyyy')}
                </p>
                <span className="text-indigo-600 text-sm font-medium hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">No posts yet</h2>
          <p className="mt-2 text-gray-600">Check back later for new content!</p>
        </div>
      )}
    </div>
  );
}
