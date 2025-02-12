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
          <p className="text-neon-green mt-4 text-xl">The Future of Crypto Currencies</p>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-neon-green mb-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            About
          </motion.h2>
          <motion.p 
            className="text-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Memecoins combine the power of decentralized finance with the viral nature of memes.
            Built on cutting-edge blockchain technology, we're creating a community-driven ecosystem
            that's both fun and financially rewarding.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Tokenomics Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-neon-green mb-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Tokenomics
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="p-6 border border-neon-green rounded-lg"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl mb-4">Supply</h3>
              <p>1,000,000,000,000 MEME</p>
            </motion.div>
            <motion.div 
              className="p-6 border border-neon-green rounded-lg"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl mb-4">Tax</h3>
              <p>0% Reflection</p>
              <p>0% Marketing</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="space-y-2">
          <p className="text-white">
            Created with <span className="text-red-500">♡</span> by{' '}
            <a 
              href="https://davidhlavacek.github.io/DH/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-green hover:opacity-80 transition-opacity"
            >
              David Hlavacek
            </a>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
