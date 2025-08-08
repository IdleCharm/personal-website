import {
  AboutMeButton,
  GitHubButton,
  LinkedInButton,
  MailButton,
  ResumeButton,
} from "./Socials";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>
      <div className="text-center z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <img
            alt="Michael Henry - Full Stack Software Engineer"
            className="w-32 h-32 rounded-full mx-auto border-4 border-purple-400 shadow-2xl"
            src="/images/Profile.jpg"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
          Michael Henry
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Full Stack Software Engineer crafting exceptional digital experiences
          <br />
          <span className="text-purple-400 font-semibold">
            Turning ideas into scalable solutions
          </span>
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <AboutMeButton />
          <ResumeButton />
        </div>
        <div className="flex justify-center space-x-6">
          <GitHubButton />
          <LinkedInButton />
          <MailButton />
        </div>
      </div>
    </section>
  );
}
