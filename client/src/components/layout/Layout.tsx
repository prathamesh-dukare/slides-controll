export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <a href="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-8 w-8 text-gray-900"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Slide Control
              </span>
            </a>

            <div className="flex items-center">
              <a
                href="https://github.com/prathamesh-dukare/slides-controll"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <img src="/github-icon.svg" alt="Github" className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="w-full mt-auto flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="text-center text-gray-600">© 2024 Slide Control</div>
        <div className="socials flex justify-end gap-5 px-4">
          <a
            href="https://peerlist.io/prathamesh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <img src="/peerlist-black.png" alt="Peerlist" className="w-6 h-6" />
          </a>

          <a
            href="https://x.com/prathameshtwits"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            <img src="/x-icon.svg" alt="X" className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}
