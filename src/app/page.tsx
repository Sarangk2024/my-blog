import Link from 'next/link';
import SearchBar from './components/SearchBar'; // Assuming components folder is inside the app directory

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  image_url: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://68937ee4c49d24bce86afabd.mockapi.io/posts', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  // Fix: Await searchParams before accessing its properties
  const search = await searchParams;
  const searchQuery = search.q || '';
  
  const posts = await getPosts();

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: Post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.body.substring(0, 100)}...</p>
            <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">Read more</Link>
          </div>
        ))}
      </div>
    </main>
  );
}