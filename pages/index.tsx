import { motion } from 'framer-motion';
import Head from 'next/head';
import DynamicBackground from '../components/DynamicBackground';
import TypingTitle from '../components/TypingTitle';

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-hidden">
      <Head>
        <title>MEMECOINS</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
          <p className="text-neon-green mt-4 text-xl">The Future of Crypto</p>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-200px", amount: 0.1 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-neon-green mb-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-200px", amount: 0.1 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-neon-green mb-8"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
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

      {/* Roadmap Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-200px", amount: 0.1 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-neon-green mb-12 text-center"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            Roadmap
          </motion.h2>
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-neon-green/30" />
            {[
              { phase: "Phase 1", items: ["Website Launch", "Community Building", "Smart Contract Audit"] },
              { phase: "Phase 2", items: ["Token Launch", "Marketing Campaign", "Exchange Listings"] },
              { phase: "Phase 3", items: ["NFT Collection", "DAO Implementation", "Staking Platform"] },
              { phase: "Phase 4", items: ["Mobile App", "Cross-chain Bridge", "Ecosystem Expansion"] }
            ].map((phase, index) => (
              <motion.div
                key={phase.phase}
                className={`relative flex items-center gap-8 mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Timeline Node */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-green rounded-full z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.5 }}
                >
                  <div className="absolute w-full h-full rounded-full bg-neon-green/20 animate-ping" />
                </motion.div>
                
                {/* Content Card */}
                <motion.div 
                  className="w-[calc(50%-2rem)] backdrop-blur-sm bg-black/40 p-6 rounded-xl border border-neon-green/30
                           hover:border-neon-green transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-2xl text-neon-green mb-4 flex items-center gap-2">
                    <span className="text-sm px-3 py-1 rounded-full border border-neon-green/50">
                      {phase.phase}
                    </span>
                  </h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.2 }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-neon-green">→</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="min-h-screen flex items-center p-8 relative"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, margin: "-200px", amount: 0.1 }}
      >
        <motion.div 
          className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 rounded-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-neon-green mb-12"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "David Hlavacek", role: "Founder & Developer", github: "https://github.com/DavidHlavacek" },
              { name: "John Doe", role: "Marketing Lead", github: "#" },
              { name: "Jane Smith", role: "Community Manager", github: "#" },
              { name: "Alex Johnson", role: "Smart Contract Developer", github: "#" }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                style={{ borderWidth: "1px" }}
                className="p-6 border border-neon-green/30 rounded-lg text-center relative 
                         backdrop-blur-sm bg-black/40 overflow-hidden group"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  borderColor: "#39FF14", 
                  borderWidth: "3px", 
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-2xl mb-2">{member.name}</h3>
                <p className="text-neon-green mb-4">{member.role}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-transform hover:scale-110 duration-300"
                >
                  <svg className="w-6 h-6 mx-auto fill-current text-neon-green" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </motion.div>
            ))}
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
