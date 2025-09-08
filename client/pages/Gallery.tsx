import Layout from "@/components/layout/Layout";

const images = [
  "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606676539949-9b57c5f78f9a?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571601035764-3c0aa3a8a726?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618366202390-643ab96db545?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616207132229-3d1f2449dd88?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536520002442-39764a41e37c?q=80&w=1600&auto=format&fit=crop",
];

export default function Gallery() {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Before & After</h1>
          <p className="mt-2 text-muted-foreground">
            Real results from recent client work
          </p>
        </div>
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {images.map((src) => (
            <img
              key={src}
              src={src}
              alt="Detailing work"
              className="mb-4 w-full break-inside-avoid rounded-xl shadow"
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
