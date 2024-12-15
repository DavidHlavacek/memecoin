import { motion } from 'framer-motion';
import Head from 'next/head';
import DynamicBackground from '../components/DynamicBackground';
import TypingTitle from '../components/TypingTitle';

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <Head>
        <title>MEMECOINS | The Next Generation Memecoin</title>
      </Head>

      <DynamicBackground />

      {/* Hero Section */}
      <motion.section 
        className="h-screen flex items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center z-10">
          <TypingTitle />
          <p className="text-neon-green mt-4 text-xl">The Future of Meme Finance</p>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold text-neon-green mb-8">About</h2>
          <p className="text-lg">
            CryptoMeme combines the power of decentralized finance with the viral nature of memes.
            Built on cutting-edge blockchain technology, we're creating a community-driven ecosystem
            that's both fun and financially rewarding.
          </p>
        </div>
      </motion.section>

      {/* Tokenomics Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl">
          <h2 className="text-4xl font-bold text-neon-green mb-8">Tokenomics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-neon-green rounded-lg">
              <h3 className="text-2xl mb-4">Supply</h3>
              <p>1,000,000,000,000 MEME</p>
            </div>
            <div className="p-6 border border-neon-green rounded-lg">
              <h3 className="text-2xl mb-4">Tax</h3>
              <p>2% Reflection</p>
              <p>3% Marketing</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-neon-green">&copy; 2023 CryptoMeme. All rights reserved.</p>
      </footer>
    </div>
  );
}
