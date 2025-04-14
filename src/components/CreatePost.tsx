import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false),
});

type PostForm = z.infer<typeof postSchema>;



export default function CreatePost() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Cloudinary upload
  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.secure_url) throw new Error('Image upload failed');
    return data.secure_url;
  };

  const onSubmit = async (formData: PostForm) => {
    try {
      setUploading(true);

      let imageUrl = '';
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      const { data: userData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      const { error: insertError } = await supabase.from('posts').insert([
        {
          ...formData,
          image_url: imageUrl,
          author_id: userData.user?.id,
        },
      ]);

      if (insertError) throw insertError;

      navigate('/admin');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Try again!');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Only JPEG, PNG, or WEBP images allowed.');
      return;
    }

    if (selectedFile.size > maxSize) {
      alert('Max file size is 2MB.');
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">Create New Post</h1>
      </div>

      <div className="border-t border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 sm:px-6 space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              {...register('content')}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.content && <p className="text-sm text-red-600">{errors.content.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="mt-2 w-48 rounded shadow"
              />
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('published')}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Publish immediately</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
            >
              {uploading ? 'Uploading...' : 'Create Post'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
