const VIDEO_SRC = "/video/hero.mp4";

const Hero = () => {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden">
      <video
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
    </section>
  );
};

export default Hero;
