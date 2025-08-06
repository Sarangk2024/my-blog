interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://68937ee4c49d24bce86afabd.mockapi.io/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">By {post.author}</p>
      <p className="text-lg leading-relaxed">{post.body}</p>
    </main>
  );
}