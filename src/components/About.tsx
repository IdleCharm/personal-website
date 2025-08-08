interface AboutProps {
  attributes: string[];
}

export function About({ attributes }: AboutProps) {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate software engineer with over a decade of
              experience building scalable web applications. I specialize in
              modern Java, Python, JavaScript frameworks, cloud architecture,
              and creating seamless user experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open source projects, or sharing knowledge with
              the developer community. I believe in writing clean, maintainable
              code and building products that make a real difference.
            </p>
            <div className="flex flex-wrap gap-3">
              {attributes.map((attribute) => (
                <span
                  key={attribute}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium"
                >
                  {attribute}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-8">
              <img
                alt="Michael Henry with Family"
                className="w-full h-64 object-cover rounded-xl"
                src="/images/Family.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
