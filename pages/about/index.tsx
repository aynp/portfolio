import type { NextPage } from 'next';
import Head from 'next/head';
import Container from '../../components/Container';

const About: NextPage = () => {
  return (
    <Container title="About | Aryan Pathania" description="About Aryan">
      <main>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <h1 className="mb-4">About Me</h1>
        </div>
      </main>
    </Container>
  );
};

export default About;
