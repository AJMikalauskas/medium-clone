//import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Header from '../components/Header'
import {sanityClient, urlFor} from "../sanity";
import { Post } from '../typings';

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Xander's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className='flex justify-between bg-yellow-400 border-y border-black py-10 '>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif '>
            <span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read, and connect</h1>  
          <h2 className=''>It's easy and free to post your thinking on any topic and connect with millions of readers</h2>
        </div>
        {/* I don't understand why height is necessary property when width is really the only thing necessary. */}
        {/* <Image className='hidden md:inline-flex md:w-72 md:h-52 lg:h-76 lg:w-108' src="/medium-logo.png"  alt='Medium-Logo' width="200" height="0" /> */}
        <img className='hidden my-auto md:inline-flex md:w-56 md:h-40 lg:h-full lg:w-96' src='/medium-logo.png' alt='medium-logo'/>
      </div>

      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/posts/${post.slug.current}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden' >
              <img src={
                urlFor(post.mainImage).url()!
              } alt='post-image' className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200'/>
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='font-bold text-lg'>{post.title}</p>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>

                <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt='author-image'/>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Built on Server first and then sent to user interface
export const getServerSideProps = async() => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  const posts = await sanityClient.fetch(query);

  return {
    props: { posts, }, 
  }
}

export default Home
