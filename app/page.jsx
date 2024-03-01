import Feed from "@components/Feed";

function Home() {
  return (
    <section className='w-full flex-center flex-col '>
      <h1 className='text-center head_text'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='blue_gradient text-center'>
          AI Powered Prompts
        </span>
      </h1>
      <p className='text-center desc'>
        Unleash the Potential of
        AI-Driven Prompts for Creative
        Expression
      </p>

      {/* Feed */}

      <Feed />
    </section>
  );
}

export default Home;
