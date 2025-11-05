import { redirect } from 'next/navigation';

export default function Page({ params }) {
  const shortId = params.slug[0]; // Assuming slug is an array
  // Proxy to backend
  redirect(`https://tinyz-backend.vercel.app/${shortId}`);
}