import { Layout } from "../components/layout/Layout";
import AccordionComponent from "../components/AccordionBox";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../components/ui/tooltip";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Present with Confidence,
          <br />
          Control with Ease
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Turn your phone, tablet or computer into a presentation remote. Roam
          around and present with confidence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-8 sm:gap-x-6">
          <button
            onClick={() => navigate("/session")}
            className="rounded-md bg-gray-900 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Start Presenting
          </button>
          <Tooltip content="DM me on Peerlist">
            <a
              href="https://peerlist.io/prathamesh"
              target="_blank"
              className="text-lg font-semibold leading-6 text-gray-900 hover:underline"
            >
              I have feedback{" "}
              <span className="hidden" aria-hidden="true">
                →
              </span>
            </a>
          </Tooltip>
        </div>
      </div>

      <div id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How it Works
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">1</span>
                  </div>
                  Download Desktop App
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Download our desktop application for your computer
                    (available for macOS and Windows).
                  </p>
                  <p className="mt-6">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                    >
                      Download for macOS <span aria-hidden="true">→</span>
                    </a>
                  </p>
                  <p className="mt-2">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                    >
                      Download for Windows <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">2</span>
                  </div>
                  Create Session
                </dt>

                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Create a new session on this website from any device and get
                    your unique session key.
                  </p>
                  <p className="mt-6">
                    <button
                      onClick={() => navigate("/session")}
                      className="text-sm font-semibold leading-6 text-gray-900 hover:underline"
                    >
                      Create Session <span aria-hidden="true">→</span>
                    </button>
                  </p>
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                    <span className="text-white">3</span>
                  </div>
                  Connect & Present
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Enter your session ID in the desktop app and start
                    controlling your presentation from any device.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Common Questions
            </h2>
          </div>

          <div className="mx-auto mt-10 w-full max-w-5xl border-gray-200 rounded-lg p-4 sm:px-8 px-4">
            <AccordionComponent
              items={[
                {
                  title: "Do I need to install anything on my phone?",
                  content:
                    "No, you don't need to install anything on your phone or tablet. Simply open the web app in your browser to control presentations. The desktop app is only required on the computer where you'll be presenting.",
                },
                {
                  title: "On which apps does this work?",
                  content:
                    "This works on any app or website on your computer such as PowerPoint, Google Slides, Figma, Keynote, etc.",
                },
                {
                  title: "How secure is this?",
                  content:
                    "This is secure, it just mimics the keyboard and mouse's behavior on your computer to control the presentation. We dont take access of any data from your computer. Also This tool is open source.",
                },
                {
                  title: "Which platforms are supported?",
                  content:
                    "As of now, this works on macOS and Windows. (your remote is on the web)",
                },
                {
                  title: "Can I connect with bluetooth?",
                  content:
                    "Not right now but Im working on it soon you will be able to connect via bluetooth for sure.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
