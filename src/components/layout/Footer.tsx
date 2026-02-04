import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 text-white py-12 border-t border-zinc-900">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <Link href="/" className="text-2xl font-bold font-mono tracking-tighter">
                        KSJ<span className="text-primary">.</span>
                    </Link>
                    <p className="text-gray-400 mt-2 text-sm">
                        Built with passion, code, and curiosity.
                    </p>
                </div>

                <div className="flex space-x-6">
                    <a href="https://github.com/koushiksjain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/koushik-s-jain-5361ba228" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:kkoushikjain@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-8 pt-8 border-t border-zinc-900 text-center text-gray-500 text-sm">
                &copy; {currentYear} Koushik S Jain. All rights reserved.
            </div>
        </footer>
    );
}
