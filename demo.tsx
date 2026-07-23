import { AnimatedFolder } from "@/components/ui/3d-folder"

const portfolioData = [
  {
    title: "Visual Identity & Logo Design",
    projects: [
      { id: "1", image: "assets/logo3.jpeg", title: "Proteios Education" },
      { id: "2", image: "assets/Vitasta.jpeg", title: "Vitasta" },
      { id: "3", image: "assets/wath habour.jpeg", title: "WathHarbor Project" },
    ]
  },
  {
    title: "Brand Identity & Media",
    projects: [
      { id: "4", image: "assets/Basti ki patshala.jpeg", title: "Basti Ki Pathshala" },
      { id: "5", image: "assets/inAmigos Foundation.png", title: "inAmigos Foundation" },
      { id: "6", image: "assets/Nabeel Showkat meetup.jpeg", title: "FutureX Learning" },
    ]
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center w-full">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center justify-center gap-8 w-full">
          {portfolioData.map((folder) => (
            <AnimatedFolder key={folder.title} title={folder.title} projects={folder.projects} />
          ))}
        </div>
      </section>
    </main>
  )
}
