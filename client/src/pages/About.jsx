import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 bg-black bg-opacity-70 backdrop-blur-sm rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-6">About MeTTa</h1>
      
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <section>
          <h2 className="text-2xl font-semibold mb-3">What is MeTTa?</h2>
          <p className="text-gray-300 leading-relaxed">
            MeTTa is a powerful, general-purpose programming language designed for knowledge representation and reasoning. 
            It provides a flexible and expressive syntax for working with complex data structures and logical relationships.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Expressive syntax for knowledge representation</li>
            <li>Powerful pattern matching capabilities</li>
            <li>First-class support for logical reasoning</li>
            <li>Efficient execution model</li>
            <li>Extensible architecture</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Get Started</h2>
          <div className="bg-gray-900 p-4 rounded-lg">
            <code className="text-green-400">
              # Install MeTTa CLI<br />
              $ pip install metta<br /><br />
              
              # Start the REPL<br />
              $ metta<br />
              > (println "Hello, MeTTa!")
            </code>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default About;
