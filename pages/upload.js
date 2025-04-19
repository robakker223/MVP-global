import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Upload() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from('products').insert([{
      name,
      description,
      tags: tags.split(',').map(tag => tag.trim()), // convert comma list to array
      price: parseFloat(price),
      image_url: imageUrl,
    }]);

    if (error) {
      setMessage('❌ Upload failed. Check your fields.');
      console.error(error);
    } else {
      setMessage('✅ Product added!');
      setName('');
      setDescription('');
      setTags('');
      setPrice('');
      setImageUrl('');
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Upload a Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        /><br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Submit Product</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
