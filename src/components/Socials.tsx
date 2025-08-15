import {
  AboutMeIcon,
  ExternalLinkIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
} from "./Icons";

export function AboutMeButton() {
  return (
    // TODO: Replace with Modal
    <button
      className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <AboutMeIcon className="mr-2 h-5 w-5" />
      More About Me
    </button>
  );
}
export function ResumeButton() {
  return (
    <button
      className="inline-flex items-center justify-center border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
      onClick={() => window.open("/api/resume", "_blank")}
    >
      <ExternalLinkIcon className="mr-2 h-5 w-5" />
      View Resume
    </button>
  );
}

export function GitHubButton() {
  return (
    <button
      className="inline-flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-full p-3 transition-all duration-300"
      onClick={() => window.open("https://github.com/IdleCharm", "_blank")}
    >
      <GithubIcon />
    </button>
  );
}

export function LinkedInButton() {
  return (
    <button
      className="inline-flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-full p-3 transition-all duration-300"
      onClick={() =>
        window.open("https://www.linkedin.com/in/mhenry01/", "_blank")
      }
    >
      <LinkedInIcon />
    </button>
  );
}

export function MailButton() {
  return (
    <button
      className="inline-flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-full p-3 transition-all duration-300"
      onClick={() => (window.location.href = "mailto:hello@michaelhenry.me")}
    >
      <MailIcon className="h-6 w-6" />
    </button>
  );
}
