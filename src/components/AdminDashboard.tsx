import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Post {
  id: string;
  title: string;
  published: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error("Error fetching posts.");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function togglePublished(post: Post) {
    try {
      const { error } = await supabase
        .from("posts")
        .update({ published: !post.published })
        .eq("id", post.id);

      if (error) throw error;
      toast.success(
        `Post ${post.published ? "unpublished" : "published"} successfully.`
      );
      await fetchPosts();
    } catch (error) {
      toast.error("Error updating post.");
      console.error("Error updating post:", error);
    }
  }

  async function deletePost(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    toast.info("Deleting post...");

    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) throw error;
      toast.success("Post deleted successfully.");
      await fetchPosts();
    } catch (error) {
      toast.error("Error deleting post.");
      console.error("Error deleting post:", error);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <ToastContainer />
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Manage Posts</h1>
        <Link
          to="/admin/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Create New Post
        </Link>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-medium text-gray-900 truncate">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {format(new Date(post.created_at), "MMMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => togglePublished(post)}
                    className={`p-2 rounded-full ${
                      post.published
                        ? "text-green-600 hover:bg-green-100"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    {post.published ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  <Link
                    to={`/admin/edit/${post.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                  >
                    <Pencil size={20} />
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {posts.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No posts yet. Create your first post!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
