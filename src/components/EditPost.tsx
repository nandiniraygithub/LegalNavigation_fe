import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false),
});

type PostForm = z.infer<typeof postSchema>;

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          reset(data);
          if (data.image_url) {
            setCurrentImageUrl(data.image_url);
          }
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, navigate, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: PostForm) => {
    try {
      let imageUrl = currentImageUrl;
      
      // Upload new image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `post-images/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
      }
      
      const payload = {
        ...data,
        image_url: imageUrl,
      };
      
      const { error } = await supabase
        .from('posts')
        .update(payload)
        .eq('id', id);

      if (error) throw error;
      navigate('/admin');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">Edit Post</h1>
      </div>
      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 sm:px-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              {...register('content')}
              rows={8}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">New image preview:</p>
                <img src={imagePreview} alt="Preview" className="h-24 w-auto object-cover rounded mt-1" />
              </div>
            )}
            {currentImageUrl && !imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current image:</p>
                <img src={currentImageUrl} alt="Current" className="h-24 w-auto object-cover rounded mt-1" />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('published')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}